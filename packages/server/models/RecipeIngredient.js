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
 *         - ingredientName
 *         - quantity
 *         - unitOfMeasure
 *       properties:
 *         recipeId:
 *           type: integer
 *           description: ID of the recipe
 *         ingredientName:
 *           type: string
 *           description: Name of the ingredient
 *         quantity:
 *           type: float
 *           description: Quantity of the ingredient in the recipe
 *         unitOfMeasure:
 *           type: string
 *           description: Unit of measure for the ingredient
 *       examples:
 *         - recipeId: 1
 *           ingredientName: Tomato
 *           quantity: 200
 *           unitOfMeasure: "grams"
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
 *       examples:
 *         RecipeIngredientInputExample:
 *           value:
 *             recipeId: 1
 *             ingredientId: 1
 *             quantity: 200
 *             unitOfMeasure: "grams"
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
 *       examples:
 *         - quantity: 200
 *           unitOfMeasure: "g"
 *           ingredient: {id: 1, name: "Tomato"}
 *           recipeId: 1
 */
const RecipeIngredient = sequelize.define(
  'recipe_ingredients',
  {
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    unitOfMeasure: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ingredientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: 'recipe_ingredient_unique_constraint',
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: 'recipe_ingredient_unique_constraint',
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['ingredientId', 'recipeId'],
        name: 'recipe_ingredient_unique_constraint',
      },
    ],
  }
);

Ingredient.hasMany(RecipeIngredient, {
  foreignKey: 'ingredientId',
  as: 'recipeIngredients',
});
RecipeIngredient.belongsTo(Ingredient, {
  foreignKey: 'ingredientId',
  as: 'ingredient',
});

Recipe.hasMany(RecipeIngredient, {
  foreignKey: 'recipeId',
  as: 'recipeIngredients',
});
RecipeIngredient.belongsTo(Recipe, { foreignKey: 'recipeId', as: 'recipe' });

module.exports = RecipeIngredient;
