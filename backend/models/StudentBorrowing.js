const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const StudentBorrowing = sequelize.define('studentborrowing', {
  BorrowID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  StudentRegNumber: {
    type: DataTypes.STRING(20)
  },
  AccessionNumber: {
    type: DataTypes.STRING(30)
  },
  BorrowDate: {
    type: DataTypes.DATEONLY
  },
  ReturnDate: {
    type: DataTypes.DATEONLY
  },
  Status: {
    type: DataTypes.STRING(50)
  }
}, {
  tableName: 'studentborrowing',
  timestamps: false
});

module.exports = StudentBorrowing;
