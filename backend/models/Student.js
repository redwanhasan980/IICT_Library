const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Student = sequelize.define('Student', {
  StudentRegNumber: {
    type: DataTypes.STRING(20),
    primaryKey: true,
    allowNull: false
  },
  StudentName: {
    type: DataTypes.STRING(150),
    allowNull: true
  },
  PhoneNumber: {
    type: DataTypes.STRING(15),
    allowNull: true
  },
  DepartmentNameShortHand: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  Session: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  Email: {
    type: DataTypes.STRING(100),
    allowNull: true
  }
}, {
  tableName: 'student',
  timestamps: false
});

module.exports = Student;
