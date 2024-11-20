const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Recipe = require('./Recipe');
const Ingredient = require('./Ingredient');

/**
 * @swagger
 * components:
 *   schemas:
 *     RecipeIngredientInputCreateIngredient:
 *       type: object
 *       required:
 *         - recipeId
 *         - ingredient_name
 *         - quantity
 *         - unitOfMeasure
 *       properties:
 *         recipeId:
 *           type: integer
 *           description: ID of the recipe
 *         ingredient_name:
 *           type: string
 *           description: Name of the ingredient
 *         quantity:
 *           type: float
 *           description: Quantity of the ingredient in the recipe
 *         unitOfMeasure:
 *           type: string
 *           description: Unit of measure for the ingredient
 *       example:
 *         ingredient_name: Tomato
 *         quantity: 200
 *         unitOfMeasure: "grams"
 *     RecipeIngredientInput:
 *       type: object
 *       required:
 *         - recipeId
 *         - ingredientId
 *         - quantity
 *         - unitOfMeasure
 *       properties:
 *         recipeId:
 *           type: integer
 *           description: ID of the recipe
 *         ingredientId:
 *           type: integer
 *           description: ID of the ingredient
 *         quantity:
 *           type: float
 *           description: Quantity of the ingredient in the recipe
 *         unitOfMeasure:
 *           type: string
 *           description: Unit of measure for the ingredient
 *       example:
 *         ingredientId: 1
 *         quantity: 200
 *         unitOfMeasure: "grams"
 *     RecipeIngredient:
 *       type: object
 *       required:
 *         - ingredient
 *         - quantity
 *         - unitOfMeasure
 *         - recipeId
 *       properties:
 *         quantity:
 *           type: string
 *           description: Quantity of the ingredient in the recipe
 *         unitOfMeasure:
 *           type: string
 *           description: Unit of measure for the ingredient
 *         ingredient:
 *           $ref: '#/components/schemas/Ingredient'
 *         recipeId:
 *           type: integer
 *           description: ID of the recipe
 *         ingredientId:
 *           type: integer
 *           description: ID of the ingredient
 *         createdAt:
 *           type: string
 *           description: Date and time of creation
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           description: Date and time of last update
 *           format: date-time
 *       example:
 *         quantity: 200
 *         unitOfMeasure: "g"
 *         ingredient: {id: 1, name: "Tomato"}
 *         recipeId: 1
 */
const RecipeIngredient = sequelize.define('recipe_ingredients', {
  quantity: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  unitOfMeasure: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Ingredient.hasMany(RecipeIngredient, { foreignKey: 'ingredientId' });
RecipeIngredient.belongsTo(Ingredient, {
  foreignKey: 'ingredientId',
  as: 'Ingredient',
});

Recipe.hasMany(RecipeIngredient, { foreignKey: 'recipeId' });
RecipeIngredient.belongsTo(Recipe, { foreignKey: 'recipeId', as: 'Recipe' });

module.exports = RecipeIngredient;
