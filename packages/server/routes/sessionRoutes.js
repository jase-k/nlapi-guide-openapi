const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionsController');
/**
 * @swagger
 * tags:
 *   - name: no-nlapi
 *     description: Ignored by the NLAPI
 *   - name: Session
 *     description: Session management
 */

/**
 * @swagger
 * /api/session/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Session, no-nlapi]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegister'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: User already exists
 */
router.post('/register', sessionController.register);

/**
 * @swagger
 * /api/session/login:
 *   post:
 *     summary: Login a user
 *     tags: [Session, no-nlapi]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 */
router.post('/login', sessionController.login);

module.exports = router;
