const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Department = sequelize.define('Department', {
  DepartmentNameShortHand: {
    type: DataTypes.STRING(20),
    primaryKey: true,
    allowNull: false
  },
  DepartmentName: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  DepartmentHeadName: {
    type: DataTypes.STRING(100),
    allowNull: true
  }
}, {
  tableName: 'department',
  timestamps: false
});

module.exports = Department;
