const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Faculty = sequelize.define('Faculty', {
  TeacherID: {
    type: DataTypes.STRING(20),
    primaryKey: true,
    allowNull: false
  },
  TeacherName: {
    type: DataTypes.STRING(150),
    allowNull: true
  },
  DepartmentNameShortHand: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  Designation: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  Signature: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  Email: {
    type: DataTypes.STRING(100),
    allowNull: true
  }
}, {
  tableName: 'faculty',
  timestamps: false
});

module.exports = Faculty;
