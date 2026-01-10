const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Book = require('./Book');
const Member = require('./Member');

const Transaction = sequelize.define('Transaction', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  bookId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'books',
      key: 'id'
    }
  },
  memberId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'members',
      key: 'id'
    }
  },
  issueDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  returnDate: {
    type: DataTypes.DATE
  },
  status: {
    type: DataTypes.ENUM('issued', 'returned', 'overdue'),
    defaultValue: 'issued'
  },
  fine: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00
  },
  remarks: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'transactions',
  timestamps: true
});

// Define associations
Transaction.belongsTo(Book, { foreignKey: 'bookId' });
Transaction.belongsTo(Member, { foreignKey: 'memberId' });
Book.hasMany(Transaction, { foreignKey: 'bookId' });
Member.hasMany(Transaction, { foreignKey: 'memberId' });

module.exports = Transaction;
