// src/routes/nlapiRoutes.js

const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authenticate');
const nlapiController = require('../controllers/nlapiController');
// Define a route to handle requests to the NLAPI
/**
 * @swagger
 * /api/nlapi:
 *   post:
 *     summary: Send a request to the NLAPI
 *     tags: [no-nlapi]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NlapiInput'
 *     responses:
 *       200:
 *         description: The response from the NLAPI
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NlapiOutput'
 */
router.post('', authenticateToken, nlapiController.sendNlapiRequest);

module.exports = router;
