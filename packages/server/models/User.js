// src/models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Family = require('./Family');
const bcrypt = require('bcrypt');

/**
 * @swagger
 * components:
 *   schemas:
 *     UserPublic:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated ID
 *         name:
 *           type: string
 *           description: User's name
 *         familyId:
 *           type: integer
 *           description: ID of the family the user belongs to
 *         email:
 *           type: string
 *           description: User's email
 *     UserPrivate:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated ID
 *         name:
 *           type: string
 *           description: User's name
 *         email:
 *           type: string
 *           description: User's email
 *         familyId:
 *           type: integer
 *           description: ID of the family the user belongs to
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the user was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the user was last updated
 *       example:
 *         id: 1
 *         name: Bugs Bunny
 *         email: bugs.bunny@example.com
 *         familyId: 1
 *         createdAt: 2023-01-01T00:00:00.000Z
 *         updatedAt: 2023-01-01T00:00:00.000Z
 *     UserRegister:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: User's name
 *         email:
 *           type: string
 *           description: User's email
 *         password:
 *           type: string
 *           description: User's password
 *         familyId:
 *           type: integer
 *           description: ID of the family the user belongs to
 *       example:
 *         name: Bugs Bunny
 *         email: bugs.bunny@example.com
 *         password: CarrotLover123
 *         familyId: 1
 *     UserLogin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: User's email
 *         password:
 *           type: string
 *           description: User's password
 *       example:
 *         email: bugs.bunny@example.com
 *         password: CarrotLover123
 */
const User = sequelize.define('users', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Relationships
User.belongsTo(Family, { foreignKey: 'familyId' });
Family.hasMany(User, { foreignKey: 'familyId' });

// Hooks
User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

module.exports = User;
