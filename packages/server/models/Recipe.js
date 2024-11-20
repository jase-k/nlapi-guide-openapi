const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

/**
 * @swagger
 * components:
 *   schemas:
 *     RecipeInput:
 *       type: object
 *       required:
 *         - title
 *         - ingredients
 *         - instructions
 *       properties:
 *         title:
 *           type: string
 *           description: Title of the recipe
 *         instructions:
 *           type: string
 *         recipeIngredients:
 *           type: array
 *           description: Ingredients required for the recipe
 *           items:
 *            oneOf:
 *              - $ref: '#/components/schemas/RecipeIngredientInputCreateIngredient'
 *              - $ref: '#/components/schemas/RecipeIngredientInput'
 *       example:
 *         title: Spaghetti Bolognese
 *         recipeIngredients: [{ingredientId: 1, quantity: 2, unitOfMeasure: "cups"}, {ingredient_name: Tomato, quantity: 200, unitOfMeasure: "grams"}]
 *         instructions: Cook spaghetti, prepare sauce, mix together
 *     Recipe:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - ingredients
 *         - instructions
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated ID
 *         title:
 *           type: string
 *           description: Title of the recipe
 *         instructions:
 *           type: string
 *           description: Cooking instructions
 *         createdAt:
 *           type: string
 *           description: Date and time of creation
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           description: Date and time of last update
 *           format: date-time
 *       example:
 *         id: 1
 *         title: Spaghetti Bolognese
 *         instructions: Cook spaghetti, prepare sauce, mix together
 *         createdAt: 2024-01-01T00:00:00.000Z
 *         updatedAt: 2024-01-01T00:00:00.000Z
 *     RecipeFull:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - ingredients
 *         - instructions
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated ID
 *         title:
 *           type: string
 *           description: Title of the recipe
 *         recipeIngredients:
 *           type: array
 *           description: Ingredients required for the recipe
 *           items:
 *             $ref: '#/components/schemas/RecipeIngredient'
 *         instructions:
 *           type: string
 *           description: Cooking instructions
 *         createdAt:
 *           type: string
 *           description: Date and time of creation
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           description: Date and time of last update
 *           format: date-time
 *       example:
 *         id: 1
 *         title: Spaghetti Bolognese
 *         recipeIngredients: [{id: 1, ingredient: {id: 1, name: "Tomato", createdAt: "2024-01-01T00:00:00.000Z", updatedAt: "2024-01-01T00:00:00.000Z"}, ingredientId: 1, quantity: 200, unitOfMeasure: "grams", createdAt: "2024-01-01T00:00:00.000Z", updatedAt: "2024-01-01T00:00:00.000Z"}, {id: 2, ingredient: {id: 2, name: "Spaghetti", createdAt: "2024-01-01T00:00:00.000Z", updatedAt: "2024-01-01T00:00:00.000Z"}, ingredientId: 2, quantity: 1, unitOfMeasure: "cups", createdAt: "2024-01-01T00:00:00.000Z", updatedAt: "2024-01-01T00:00:00.000Z"}]
 *         instructions: Cook spaghetti, prepare sauce, mix together
 */
const Recipe = sequelize.define('recipes', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  instructions: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Recipe;
