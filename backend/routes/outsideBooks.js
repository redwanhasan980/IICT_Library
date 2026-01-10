const express = require('express');
const router = express.Router();
const OutsideBook = require('../models/OutsideBook');
const { authMiddleware, isAdmin } = require('../middleware/auth');

// Log outside book (Students)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { registrationNumber, bookTitle, department, semester, studentEmail } = req.body;

    const log = await OutsideBook.create({
      registrationNumber,
      bookTitle,
      department,
      semester,
      studentEmail
    });

    res.status(201).json({ message: 'Outside book logged successfully', log });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all outside book logs (Admin)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { limit = 100 } = req.query;

    const logs = await OutsideBook.findAll({
      limit: parseInt(limit),
      order: [['createdAt', 'DESC']]
    });

    res.json({ logs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
