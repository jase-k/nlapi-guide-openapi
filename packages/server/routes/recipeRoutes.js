const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const authenticateToken = require('../middlewares/authenticate');

/**
 * @swagger
 * tags:
 *   name: Recipes
 *   description: Recipe management
 */

/**
 * @swagger
 * /api/recipes:
 *   post:
 *     summary: Create a new recipe
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RecipeInput'
 *     responses:
 *       201:
 *         description: Recipe created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 *       401:
 *         description: Unauthenticated
 */
router.post('/', authenticateToken, recipeController.createRecipe);

/**
 * @swagger
 * /api/recipes:
 *   get:
 *     summary: Get all recipes. Doesn't include ingredients. To get the recipe with ingredients, use /api/recipes/{id}
 *     tags: [Recipes]
 *     responses:
 *       200:
 *         description: A list of Recipe objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recipe'
 */
router.get('/', recipeController.getAllRecipes);

/**
 * @swagger
 * /api/recipes/{id}:
 *   get:
 *     summary: Get a single recipe by ID
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The recipe ID
 *     responses:
 *       200:
 *         description: A single Recipe object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RecipeFull'
 *       404:
 *         description: Recipe not found
 */
router.get('/:id', recipeController.getRecipeById);

/**
 * @swagger
 * /api/recipes/{id}:
 *   put:
 *     summary: Update a recipe
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The recipe ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RecipeInput'
 *     responses:
 *       200:
 *         description: Recipe updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 *       404:
 *         description: Recipe not found
 */
router.put('/:id', authenticateToken, recipeController.updateRecipe);

/**
 * @swagger
 * /api/recipes/{id}:
 *   delete:
 *     summary: Delete a recipe
 *     tags: [Recipes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The recipe ID
 *     responses:
 *       204:
 *         description: Recipe deleted successfully
 *       404:
 *         description: Recipe not found
 */
router.delete('/:id', authenticateToken, recipeController.deleteRecipe);

/**
 * @swagger
 * /api/recipes/search:
 *   get:
 *     summary: Search recipes
 *     tags: [Recipes]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: The search query
 *     responses:
 *       200:
 *         description: A list of Recipe objects matching the search query
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recipe'
 */
router.get('/search', recipeController.searchRecipes);

module.exports = router;
