const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Member = sequelize.define('Member', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  membershipId: {
    type: DataTypes.STRING(20),
    unique: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    unique: true,
    validate: {
      isEmail: true
    }
  },
  phone: {
    type: DataTypes.STRING(15)
  },
  address: {
    type: DataTypes.TEXT
  },
  memberType: {
    type: DataTypes.ENUM('student', 'faculty', 'staff', 'external'),
    defaultValue: 'student'
  },
  department: {
    type: DataTypes.STRING(100)
  },
  enrollmentDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  expiryDate: {
    type: DataTypes.DATE
  },
  status: {
    type: DataTypes.ENUM('active', 'suspended', 'expired'),
    defaultValue: 'active'
  }
}, {
  tableName: 'members',
  timestamps: true
});

module.exports = Member;
