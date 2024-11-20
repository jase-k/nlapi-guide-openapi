const express = require('express');
const router = express.Router();
const ingredientController = require('../controllers/ingredientController');
const authenticateToken = require('../middlewares/authenticate');

/**
 * @swagger
 * tags:
 *   name: Ingredients
 *   description: Ingredient management
 */

/**
 * @swagger
 * /api/ingredients:
 *   post:
 *     summary: Create a new ingredient
 *     tags: [Ingredients]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IngredientInput'
 *     responses:
 *       201:
 *         description: Ingredient created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ingredient'
 *       401:
 *         description: Unauthenticated
 */
router.post('/', authenticateToken, ingredientController.createIngredient);

/**
 * @swagger
 * /api/ingredients:
 *   get:
 *     summary: Get all ingredients
 *     tags: [Ingredients]
 *     responses:
 *       200:
 *         description: A list of Ingredient objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ingredient'
 */
router.get('/', ingredientController.getAllIngredients);
/**
 * @swagger
 * /api/ingredients/search:
 *   get:
 *     summary: Search ingredients
 *     tags: [Ingredients]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: The search query
 *       - in: query
 *         name: searchBy
 *         required: false
 *         schema:
 *           type: string
 *           enum: [name]
 *         description: The field to search by (default is 'name')
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 3
 *         description: The maximum number of results to return
 *     responses:
 *       200:
 *         description: A list of matching Ingredient objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ingredient'
 *       400:
 *         description: Invalid searchBy parameter
 *       500:
 *         description: Failed to search ingredients
 */
router.get('/search', ingredientController.searchIngredients);

module.exports = router;
