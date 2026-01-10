const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const Book = require('../models/Book');
const Member = require('../models/Member');
const { authMiddleware, isAdmin } = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

// Get all transactions
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { page = 1, limit = 10, status = '' } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = status ? { status } : {};

    const transactions = await Transaction.findAndCountAll({
      where: whereClause,
      include: [
        { model: Book, attributes: ['title', 'author', 'isbn'] },
        { model: Member, attributes: ['name', 'membershipId', 'email'] }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });

    res.json({
      transactions: transactions.rows,
      totalPages: Math.ceil(transactions.count / limit),
      currentPage: parseInt(page),
      total: transactions.count
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Issue book (Admin only)
router.post('/issue', [authMiddleware, isAdmin], [
  body('bookId').isInt().withMessage('Valid book ID is required'),
  body('memberId').isInt().withMessage('Valid member ID is required'),
  body('dueDate').isISO8601().withMessage('Valid due date is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { bookId, memberId, dueDate } = req.body;

    // Check if book is available
    const book = await Book.findByPk(bookId);
    if (!book || book.available < 1) {
      return res.status(400).json({ error: 'Book not available' });
    }

    // Check if member exists and is active
    const member = await Member.findByPk(memberId);
    if (!member || member.status !== 'active') {
      return res.status(400).json({ error: 'Member not found or inactive' });
    }

    // Create transaction
    const transaction = await Transaction.create({
      bookId,
      memberId,
      dueDate,
      status: 'issued'
    });

    // Update book availability
    await book.update({ available: book.available - 1 });

    res.status(201).json({ message: 'Book issued successfully', transaction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Return book (Admin only)
router.put('/return/:id', [authMiddleware, isAdmin], async (req, res) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id);
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    if (transaction.status === 'returned') {
      return res.status(400).json({ error: 'Book already returned' });
    }

    // Calculate fine if overdue
    const returnDate = new Date();
    const dueDate = new Date(transaction.dueDate);
    let fine = 0;

    if (returnDate > dueDate) {
      const daysOverdue = Math.ceil((returnDate - dueDate) / (1000 * 60 * 60 * 24));
      fine = daysOverdue * 5; // 5 per day fine
    }

    // Update transaction
    await transaction.update({
      returnDate,
      status: returnDate > dueDate ? 'overdue' : 'returned',
      fine,
      ...req.body
    });

    // Update book availability
    const book = await Book.findByPk(transaction.bookId);
    await book.update({ available: book.available + 1 });

    res.json({ message: 'Book returned successfully', transaction, fine });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get transaction by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id, {
      include: [
        { model: Book },
        { model: Member }
      ]
    });

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    res.json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
