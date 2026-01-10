const express = require('express');
const router = express.Router();
const BookCatalog = require('../models/BookCatalog');
const Classification = require('../models/Classification');
const { authMiddleware } = require('../middleware/auth');
const { Op } = require('sequelize');

// Get all books from catalog
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { page = 1, limit = 100, search = '', searchBy = 'title' } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = {};
    if (search) {
      switch (searchBy) {
        case 'author':
          whereClause = { AuthorEditor: { [Op.like]: `%${search}%` } };
          break;
        case 'accession':
          whereClause = { AccessionNumber: { [Op.like]: `%${search}%` } };
          break;
        case 'isbn':
          whereClause = { ISBN: { [Op.like]: `%${search}%` } };
          break;
        case 'title':
        default:
          whereClause = { Title: { [Op.like]: `%${search}%` } };
      }
    }

    const books = await BookCatalog.findAndCountAll({
      where: whereClause,
      include: [{
        model: Classification,
        as: 'classification',
        foreignKey: 'AccessionNumber',
        required: false
      }],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['AccessionNumber', 'DESC']]
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

// Get book details by accession number
router.get('/:accessionNumber', authMiddleware, async (req, res) => {
  try {
    const book = await BookCatalog.findOne({
      where: { AccessionNumber: req.params.accessionNumber },
      include: [{
        model: Classification,
        as: 'classification',
        foreignKey: 'AccessionNumber',
        required: false
      }]
    });

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get books by category
router.get('/category/:category', authMiddleware, async (req, res) => {
  try {
    const books = await BookCatalog.findAll({
      include: [{
        model: Classification,
        as: 'classification',
        where: { SubjectCategory: { [Op.like]: `%${req.params.category}%` } },
        foreignKey: 'AccessionNumber',
        required: true
      }],
      limit: 100
    });

    res.json({ books });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
