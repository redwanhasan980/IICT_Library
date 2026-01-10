const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const StudentBorrowing = require('../models/StudentBorrowing');
const BookCatalog = require('../models/BookCatalog');
const Department = require('../models/Department');
const { authMiddleware } = require('../middleware/auth');

// Get student profile by registration number
router.get('/profile/:regNumber', authMiddleware, async (req, res) => {
  try {
    console.log('Searching for student with reg number:', req.params.regNumber);
    
    const student = await Student.findOne({
      where: { StudentRegNumber: req.params.regNumber },
      include: [{
        model: Department,
        as: 'department',
        foreignKey: 'DepartmentNameShortHand'
      }]
    });

    console.log('Student found:', student);

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json(student);
  } catch (error) {
    console.error('Error in /students/profile:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get student borrowing history
router.get('/borrowing/:regNumber', authMiddleware, async (req, res) => {
  try {
    const borrowings = await StudentBorrowing.findAll({
      where: { StudentRegNumber: req.params.regNumber },
      include: [{
        model: BookCatalog,
        as: 'book',
        foreignKey: 'AccessionNumber'
      }],
      order: [['BorrowDate', 'DESC']]
    });

    res.json(borrowings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all students (admin only)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const students = await Student.findAll({
      include: [{
        model: Department,
        as: 'department',
        foreignKey: 'DepartmentNameShortHand'
      }]
    });

    res.json({ students });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
