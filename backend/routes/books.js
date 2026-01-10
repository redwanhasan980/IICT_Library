const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const { authMiddleware, isAdmin } = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

// Get all books
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = search ? {
      [require('sequelize').Op.or]: [
        { Title: { [require('sequelize').Op.like]: `%${search}%` } },
        { AuthorEditor: { [require('sequelize').Op.like]: `%${search}%` } },
        { ISBN: { [require('sequelize').Op.like]: `%${search}%` } },
        { AccessionNumber: { [require('sequelize').Op.like]: `%${search}%` } }
      ]
    } : {};

    const books = await Book.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['AccessionNumber', 'ASC']]
    });

    res.json({
      books: books.rows,
      totalPages: Math.ceil(books.count / limit),
      currentPage: parseInt(page),
      total: books.count
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get book by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add new book (Admin only)
router.post('/', [authMiddleware, isAdmin], [
  body('AccessionNumber').notEmpty().withMessage('Accession Number is required'),
  body('Title').notEmpty().withMessage('Title is required'),
  body('AuthorEditor').notEmpty().withMessage('Author/Editor is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const book = await Book.create(req.body);
    res.status(201).json({ message: 'Book added successfully', book });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
});

// Update book (Admin only)
router.put('/:id', [authMiddleware, isAdmin], async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    await book.update(req.body);
    res.json({ message: 'Book updated successfully', book });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete book (Admin only)
router.delete('/:id', [authMiddleware, isAdmin], async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    await book.destroy();
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
