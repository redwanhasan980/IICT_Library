const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const BookCatalog = sequelize.define('book', {
  AccessionNumber: {
    type: DataTypes.STRING(50),
    primaryKey: true,
    allowNull: false
  },
  Title: {
    type: DataTypes.STRING(200)
  },
  AuthorEditor: {
    type: DataTypes.STRING(150)
  },
  Edition: {
    type: DataTypes.STRING(50)
  },
  Volume: {
    type: DataTypes.STRING(50)
  },
  PlaceOfPublication: {
    type: DataTypes.STRING(100)
  },
  Publisher: {
    type: DataTypes.STRING(100)
  },
  DateOfPublication: {
    type: DataTypes.DATEONLY
  },
  Source: {
    type: DataTypes.STRING(100)
  },
  Binding: {
    type: DataTypes.STRING(50)
  },
  Pagination: {
    type: DataTypes.INTEGER
  },
  BillNumber: {
    type: DataTypes.STRING(50)
  },
  BillDate: {
    type: DataTypes.DATEONLY
  },
  ISBN: {
    type: DataTypes.STRING(20)
  },
  AvailableCopy: {
    type: DataTypes.INTEGER
  }
}, {
  tableName: 'book',
  timestamps: false
});

module.exports = BookCatalog;
