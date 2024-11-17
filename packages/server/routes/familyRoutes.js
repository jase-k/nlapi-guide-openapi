const express = require('express');
const router = express.Router();
const familyController = require('../controllers/familyController');

/**
 * @swagger
 * /api/families:
 *   get:
 *     summary: Retrieve a list of families
 *     tags: [Family]
 *     responses:
 *       200:
 *         description: A list of families
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Family'
 *       500:
 *         description: Server error
 */
router.get('', familyController.getAllFamilies);

/**
 * @swagger
 * /api/families/{id}:
 *   get:
 *     summary: Retrieve a single family by ID
 *     tags: [Family]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The family ID
 *     responses:
 *       200:
 *         description: A single family
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Family'
 *       404:
 *         description: Family not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Family not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
router.get('/:id', familyController.getFamilyById);

module.exports = router;
