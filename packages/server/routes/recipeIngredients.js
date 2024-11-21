const express = require('express');
const router = express.Router();
const recipeIngredientController = require('../controllers/recipeIngredientController');
const authenticateToken = require('../middlewares/authenticate');

/**
 * @swagger
 * tags:
 *   name: RecipeIngredients
 *   description: Recipe ingredient management
 */

/**
 * @swagger
 * /api/recipe-ingredients:
 *   post:
 *     summary: Create a new recipe ingredient
 *     tags:
 *       - RecipeIngredients
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             oneOf:
 *               - $ref: '#/components/schemas/RecipeIngredientInput'
 *               - $ref: '#/components/schemas/RecipeIngredientInputCreateIngredient'
 *           examples:
 *             RecipeIngredientInputExample:
 *               value:
 *                 recipeId: 1
 *                 ingredientId: 1
 *                 quantity: 200
 *                 unitOfMeasure: "grams"
 *             RecipeIngredientInputCreateIngredientExample:
 *               value:
 *                 recipeId: 1
 *                 ingredientName: Tomato
 *                 quantity: 200
 *                 unitOfMeasure: "grams"
 *     responses:
 *       201:
 *         description: Recipe ingredient created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RecipeIngredient'
 *       401:
 *         description: Unauthenticated
 */
router.post(
  '/',
  authenticateToken,
  recipeIngredientController.createRecipeIngredient
);

/**
 * @swagger
 * /api/recipe-ingredients/{id}:
 *   delete:
 *     summary: Delete a recipe ingredient
 *     tags: [RecipeIngredients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The recipe ingredient ID
 *     responses:
 *       204:
 *         description: Recipe ingredient deleted successfully
 *       404:
 *         description: Recipe ingredient not found
 */
router.delete(
  '/:id',
  authenticateToken,
  recipeIngredientController.deleteRecipeIngredient
);

module.exports = router;
