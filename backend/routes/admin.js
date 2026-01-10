const express = require('express');
const router = express.Router();
const { authMiddleware, isAdmin } = require('../middleware/auth');
const Book = require('../models/Book');
const Student = require('../models/Student');
const Faculty = require('../models/Faculty');
const StudentBorrowing = require('../models/StudentBorrowing');
const FacultyBorrowing = require('../models/FacultyBorrowing');
const { body, validationResult } = require('express-validator');
const { Op } = require('sequelize');

// Get dashboard stats
router.get('/dashboard/stats', [authMiddleware, isAdmin], async (req, res) => {
  try {
    const totalBooks = await Book.count();
    const totalAvailableBooks = await Book.sum('AvailableCopy');
    const totalStudents = await Student.count();
    const totalFaculty = await Faculty.count();
    
    const activeStudentBorrowings = await StudentBorrowing.count({ 
      where: { Status: { [Op.ne]: 'Returned' } } 
    });
    const activeFacultyBorrowings = await FacultyBorrowing.count({ 
      where: { Status: { [Op.ne]: 'Returned' } } 
    });
    
    res.json({
      totalBooks,
      availableBooks: totalAvailableBooks || 0,
      totalMembers: totalStudents + totalFaculty,
      totalStudents,
      totalFaculty,
      activeTransactions: activeStudentBorrowings + activeFacultyBorrowings,
      overdueBooks: 0 // Can calculate based on ReturnDate
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
});

// Search members (students and faculty) for issuing books
router.get('/members/search', [authMiddleware, isAdmin], async (req, res) => {
  try {
    const { query = '' } = req.query;
    
    const students = await Student.findAll({
      where: query ? {
        [Op.or]: [
          { StudentRegNumber: { [Op.like]: `%${query}%` } },
          { StudentName: { [Op.like]: `%${query}%` } },
          { Email: { [Op.like]: `%${query}%` } }
        ]
      } : {},
      limit: 20
    });

    const faculty = await Faculty.findAll({
      where: query ? {
        [Op.or]: [
          { TeacherID: { [Op.like]: `%${query}%` } },
          { TeacherName: { [Op.like]: `%${query}%` } },
          { Email: { [Op.like]: `%${query}%` } }
        ]
      } : {},
      limit: 20
    });

    const members = [
      ...students.map(s => ({
        id: s.StudentRegNumber,
        name: s.StudentName,
        type: 'student',
        department: s.DepartmentNameShortHand,
        phone: s.PhoneNumber,
        email: s.Email
      })),
      ...faculty.map(f => ({
        id: f.TeacherID,
        name: f.TeacherName,
        type: 'faculty',
        department: f.DepartmentNameShortHand,
        designation: f.Designation,
        email: f.Email
      }))
    ];

    res.json({ members });
  } catch (error) {
    console.error('Error searching members:', error);
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
});

// Issue book to student or faculty
router.post('/issue-book', [authMiddleware, isAdmin], [
  body('accessionNumber').notEmpty().withMessage('Accession number is required'),
  body('memberId').notEmpty().withMessage('Member ID is required'),
  body('memberType').isIn(['student', 'faculty']).withMessage('Invalid member type')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { accessionNumber, memberId, memberType, borrowDate, returnDate } = req.body;

    // Check if book exists and is available
    const book = await Book.findByPk(accessionNumber);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    if (book.AvailableCopy <= 0) {
      return res.status(400).json({ error: 'No copies available' });
    }

    // Check if member exists
    if (memberType === 'student') {
      const student = await Student.findByPk(memberId);
      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }
      
      // Create borrowing record
      await StudentBorrowing.create({
        StudentRegNumber: memberId,
        AccessionNumber: accessionNumber,
        BorrowDate: borrowDate || new Date(),
        ReturnDate: returnDate || null,
        Status: 'Borrowed'
      });
    } else {
      const faculty = await Faculty.findByPk(memberId);
      if (!faculty) {
        return res.status(404).json({ error: 'Faculty not found' });
      }
      
      // Create borrowing record
      await FacultyBorrowing.create({
        TeacherID: memberId,
        AccessionNumber: accessionNumber,
        BorrowDate: borrowDate || new Date(),
        ReturnDate: returnDate || null,
        Status: 'Borrowed'
      });
    }

    // Update available copies
    await book.update({ AvailableCopy: book.AvailableCopy - 1 });

    res.json({ message: 'Book issued successfully' });
  } catch (error) {
    console.error('Error issuing book:', error);
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
});

// Get active borrowings
router.get('/borrowings/active', [authMiddleware, isAdmin], async (req, res) => {
  try {
    const { memberType, search = '' } = req.query;
    
    let borrowings = [];

    if (!memberType || memberType === 'student') {
      const studentBorrowings = await StudentBorrowing.findAll({
        where: { Status: { [Op.ne]: 'Returned' } },
        include: [
          { model: Student, as: 'student' },
          { model: Book, as: 'book' }
        ],
        order: [['BorrowDate', 'DESC']]
      });

      borrowings = borrowings.concat(studentBorrowings.map(b => ({
        borrowId: b.BorrowID,
        memberId: b.StudentRegNumber,
        memberName: b.student?.StudentName || 'N/A',
        memberType: 'student',
        accessionNumber: b.AccessionNumber,
        bookTitle: b.book?.Title || 'N/A',
        borrowDate: b.BorrowDate,
        returnDate: b.ReturnDate,
        status: b.Status
      })));
    }

    if (!memberType || memberType === 'faculty') {
      const facultyBorrowings = await FacultyBorrowing.findAll({
        where: { Status: { [Op.ne]: 'Returned' } },
        include: [
          { model: Faculty, as: 'faculty' },
          { model: Book, as: 'book' }
        ],
        order: [['BorrowDate', 'DESC']]
      });

      borrowings = borrowings.concat(facultyBorrowings.map(b => ({
        borrowId: b.BorrowID,
        memberId: b.TeacherID,
        memberName: b.faculty?.TeacherName || 'N/A',
        memberType: 'faculty',
        accessionNumber: b.AccessionNumber,
        bookTitle: b.book?.Title || 'N/A',
        borrowDate: b.BorrowDate,
        returnDate: b.ReturnDate,
        status: b.Status
      })));
    }

    // Apply search filter
    if (search) {
      borrowings = borrowings.filter(b => 
        b.memberName.toLowerCase().includes(search.toLowerCase()) ||
        b.memberId.toLowerCase().includes(search.toLowerCase()) ||
        b.bookTitle.toLowerCase().includes(search.toLowerCase()) ||
        b.accessionNumber.toLowerCase().includes(search.toLowerCase())
      );
    }

    res.json({ borrowings });
  } catch (error) {
    console.error('Error fetching borrowings:', error);
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
});

// Return book
router.post('/return-book', [authMiddleware, isAdmin], [
  body('borrowId').notEmpty().withMessage('Borrow ID is required'),
  body('memberType').isIn(['student', 'faculty']).withMessage('Invalid member type')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { borrowId, memberType } = req.body;

    let borrowing, book;

    if (memberType === 'student') {
      borrowing = await StudentBorrowing.findByPk(borrowId);
      if (!borrowing) {
        return res.status(404).json({ error: 'Borrowing record not found' });
      }
      
      book = await Book.findByPk(borrowing.AccessionNumber);
      
      await borrowing.update({
        ReturnDate: new Date(),
        Status: 'Returned'
      });
    } else {
      borrowing = await FacultyBorrowing.findByPk(borrowId);
      if (!borrowing) {
        return res.status(404).json({ error: 'Borrowing record not found' });
      }
      
      book = await Book.findByPk(borrowing.AccessionNumber);
      
      await borrowing.update({
        ReturnDate: new Date(),
        Status: 'Returned'
      });
    }

    // Increase available copies
    if (book) {
      await book.update({ AvailableCopy: book.AvailableCopy + 1 });
    }

    res.json({ message: 'Book returned successfully' });
  } catch (error) {
    console.error('Error returning book:', error);
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
});

module.exports = router;
