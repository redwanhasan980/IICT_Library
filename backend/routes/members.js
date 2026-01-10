const express = require('express');
const router = express.Router();
const Member = require('../models/Member');
const { authMiddleware, isAdmin } = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

// Get all members
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { page = 1, limit = 10, status = '' } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = status ? { status } : {};

    const members = await Member.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });

    res.json({
      members: members.rows,
      totalPages: Math.ceil(members.count / limit),
      currentPage: parseInt(page),
      total: members.count
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get member by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const member = await Member.findByPk(req.params.id);
    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }
    res.json(member);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add new member (Admin only)
router.post('/', [authMiddleware, isAdmin], [
  body('membershipId').notEmpty().withMessage('Membership ID is required'),
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const member = await Member.create(req.body);
    res.status(201).json({ message: 'Member added successfully', member });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update member (Admin only)
router.put('/:id', [authMiddleware, isAdmin], async (req, res) => {
  try {
    const member = await Member.findByPk(req.params.id);
    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }

    await member.update(req.body);
    res.json({ message: 'Member updated successfully', member });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete member (Admin only)
router.delete('/:id', [authMiddleware, isAdmin], async (req, res) => {
  try {
    const member = await Member.findByPk(req.params.id);
    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }

    await member.destroy();
    res.json({ message: 'Member deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
