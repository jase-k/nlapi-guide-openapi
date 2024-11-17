const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middlewares/authenticate');

router.use(authenticateToken);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieve a list of users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserPublic'
 *       500:
 *         description: Server error
 */
router.get('', userController.getAllUsers);

/**
 * @swagger
 * /api/users/search:
 *   get:
 *     summary: Fuzzy search users by name and email
 *     tags: [User]
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: The search query
 *       - in: query
 *         name: searchBy
 *         schema:
 *           type: string
 *           enum: [name, email]
 *         required: false
 *         description: The field to search by (default is name)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         required: false
 *         description: The maximum number of results to return (default is 3)
 *     responses:
 *       200:
 *         description: A list of users matching the search criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserPublic'
 *       400:
 *         description: Bad request
 */
router.get('/search', userController.searchUsers);

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get own user information
 *     tags: [User]
 *     responses:
 *       200:
 *         description: User profile information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserPrivate'
 *       400:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.get('/profile', userController.getUserProfile);

/**
 * @swagger
 * /api/users/profile:
 *   put:
 *     summary: Update profile information
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated user profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserPrivate'
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.put('/profile', userController.updateUserProfile);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Retrieve a single user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID
 *     responses:
 *       200:
 *         description: A single user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserPublic'
 *       404:
 *         description: User not found
 */
router.get('/:id', userController.getUserById);

module.exports = router;
