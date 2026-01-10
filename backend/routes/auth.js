const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Student = require('../models/Student');
const Faculty = require('../models/Faculty');
const { body, validationResult } = require('express-validator');

// Register
router.post('/register', [
  body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').isIn(['student', 'faculty', 'admin']).withMessage('Invalid role')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { 
      username, 
      email, 
      password, 
      role,
      // Student fields
      registrationNumber,
      fullName,
      phone,
      department,
      session,
      // Faculty fields
      teacherId,
      designation
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // For students, check if registration number exists
    if (role === 'student' && registrationNumber) {
      const existingStudent = await Student.findOne({ where: { StudentRegNumber: registrationNumber } });
      if (existingStudent && existingStudent.Email) {
        return res.status(400).json({ error: 'Student with this registration number already exists' });
      }
      
      // If student exists but no email, update it
      if (existingStudent && !existingStudent.Email) {
        await existingStudent.update({
          StudentName: fullName || existingStudent.StudentName,
          PhoneNumber: phone || existingStudent.PhoneNumber,
          DepartmentNameShortHand: department || existingStudent.DepartmentNameShortHand,
          Session: session || existingStudent.Session,
          Email: email
        });
      }
    }

    // For faculty, check if teacher ID exists
    if (role === 'faculty' && teacherId) {
      const existingFaculty = await Faculty.findOne({ where: { TeacherID: teacherId } });
      if (existingFaculty) {
        return res.status(400).json({ error: 'Faculty with this ID already exists' });
      }
    }

    // Determine user role for database
    const userRole = role === 'admin' ? 'admin' : 'member';

    // Create the User first
    const user = await User.create({
      username,
      email,
      password,
      role: userRole
    });

    // Create student or faculty record
    if (role === 'student' && registrationNumber) {
      const existingStudent = await Student.findOne({ where: { StudentRegNumber: registrationNumber } });
      
      if (existingStudent) {
        // Update existing student record
        await existingStudent.update({
          StudentName: fullName || existingStudent.StudentName,
          PhoneNumber: phone || existingStudent.PhoneNumber,
          DepartmentNameShortHand: department || existingStudent.DepartmentNameShortHand,
          Session: session || existingStudent.Session,
          Email: email
        });
      } else {
        // Create new student record
        await Student.create({
          StudentRegNumber: registrationNumber,
          StudentName: fullName,
          PhoneNumber: phone,
          DepartmentNameShortHand: department,
          Session: session,
          Email: email
        });
      }
    } else if (role === 'faculty' && teacherId) {
      await Faculty.create({
        TeacherID: teacherId,
        TeacherName: fullName,
        DepartmentNameShortHand: department,
        Designation: designation,
        Signature: username, // Using username as signature initially
        Email: email
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, role: userRole },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: role, // Return the specific role (student/faculty) for frontend redirection
        registrationNumber: role === 'student' ? registrationNumber : undefined,
        teacherId: role === 'faculty' ? teacherId : undefined
      }
    });
  } catch (error) {
    console.error(error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'Username or email already exists' });
    }
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
});

// Login
router.post('/login', [
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Find student or faculty record to get their ID
    let registrationNumber = null;
    let teacherId = null;
    
    if (user.role === 'member') {
      // Try to find student first by email
      const student = await Student.findOne({ where: { Email: email } });
      if (student) {
        registrationNumber = student.StudentRegNumber;
      } else {
        // Try faculty by email
        const faculty = await Faculty.findOne({ where: { Email: email } });
        if (faculty) {
          teacherId = faculty.TeacherID;
        }
      }
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Determine specific role for frontend
    let specificRole = user.role;
    if (user.role === 'member') {
      if (teacherId) specificRole = 'faculty';
      else if (registrationNumber) specificRole = 'student';
    }

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: specificRole,
        registrationNumber: registrationNumber,
        teacherId: teacherId
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
