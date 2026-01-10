const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const OutsideBook = sequelize.define('OutsideBook', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  registrationNumber: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  bookTitle: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  department: {
    type: DataTypes.STRING(100)
  },
  semester: {
    type: DataTypes.STRING(10)
  },
  studentEmail: {
    type: DataTypes.STRING(100)
  }
}, {
  tableName: 'outside_books',
  timestamps: true
});

module.exports = OutsideBook;
