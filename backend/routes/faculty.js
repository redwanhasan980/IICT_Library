const express = require('express');
const router = express.Router();
const Faculty = require('../models/Faculty');
const FacultyBorrowing = require('../models/FacultyBorrowing');
const BookCatalog = require('../models/BookCatalog');
const Department = require('../models/Department');
const { authMiddleware } = require('../middleware/auth');

// Get faculty profile by teacher ID
router.get('/profile/:teacherId', authMiddleware, async (req, res) => {
  try {
    const faculty = await Faculty.findOne({
      where: { TeacherID: req.params.teacherId },
      include: [{
        model: Department,
        as: 'department',
        foreignKey: 'DepartmentNameShortHand'
      }]
    });

    if (!faculty) {
      return res.status(404).json({ error: 'Faculty not found' });
    }

    res.json(faculty);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get faculty borrowing history
router.get('/borrowing/:teacherId', authMiddleware, async (req, res) => {
  try {
    const borrowings = await FacultyBorrowing.findAll({
      where: { TeacherID: req.params.teacherId },
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

// Get all faculty (admin only)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const faculty = await Faculty.findAll({
      include: [{
        model: Department,
        as: 'department',
        foreignKey: 'DepartmentNameShortHand'
      }]
    });

    res.json({ faculty });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
