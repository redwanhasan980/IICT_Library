const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Book = sequelize.define('Book', {
  AccessionNumber: {
    type: DataTypes.STRING(10),
    primaryKey: true,
    allowNull: false
  },
  Title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  AuthorEditor: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  Edition: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  Volume: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  PlaceOfPublication: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  Publisher: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  DateOfPublication: {
    type: DataTypes.DATE,
    allowNull: true
  },
  Source: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  Binding: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  Pagination: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  BillNumber: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  BillDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  ISBN: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  AvailableCopy: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  }
}, {
  tableName: 'book',
  timestamps: false
});

module.exports = Book;
