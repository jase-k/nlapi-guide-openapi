// src/models/Family.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

/**
 * @swagger
 * components:
 *   schemas:
 *     Family:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated ID
 *         name:
 *           type: string
 *           description: Family name
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the family was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the family was last updated
 *       example:
 *         id: 1
 *         name: The Tunes Family
 *         createdAt: 2023-01-01T00:00:00.000Z
 *         updatedAt: 2023-01-01T00:00:00.000Z
 */
const Family = sequelize.define('families', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Family;
