const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const FacultyBorrowing = sequelize.define('facultyborrowing', {
  BorrowID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  TeacherID: {
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
  tableName: 'facultyborrowing',
  timestamps: false
});

module.exports = FacultyBorrowing;
