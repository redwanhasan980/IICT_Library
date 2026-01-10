const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Classification = sequelize.define('classification', {
  AccessionNumber: {
    type: DataTypes.STRING(30),
    primaryKey: true,
    allowNull: false
  },
  SubjectCategory: {
    type: DataTypes.STRING(100)
  },
  DeweyDecimalNumber: {
    type: DataTypes.DECIMAL(10, 2)
  },
  CutterCode: {
    type: DataTypes.STRING(50)
  },
  CallNumber: {
    type: DataTypes.STRING(50)
  },
  LocationCode: {
    type: DataTypes.STRING(50)
  },
  CatalogEntryDate: {
    type: DataTypes.DATEONLY
  },
  CatalogedBy: {
    type: DataTypes.STRING(100)
  },
  Barcode: {
    type: DataTypes.STRING(50)
  },
  SpineLabel: {
    type: DataTypes.STRING(100)
  },
  shelfId: {
    type: DataTypes.STRING(20)
  },
  shelfCol: {
    type: DataTypes.INTEGER
  },
  shelfRow: {
    type: DataTypes.INTEGER
  }
}, {
  tableName: 'classification',
  timestamps: false
});

module.exports = Classification;
