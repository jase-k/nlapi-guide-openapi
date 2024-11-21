const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Family = require('./Family');
const RecipeIngredient = require('./RecipeIngredient');
/**
 * @swagger
 * components:
 *   schemas:
 *     ShoppingListItemInput:
 *       type: object
 *       required:
 *       properties:
 *       oneOf:
 *         - properties:
 *             recipeIngredientId:
 *               type: integer
 *               description: ID of the recipe ingredient
 *         - properties:
 *             recipeId:
 *               type: integer
 *               description: ID of the recipe
 *     ShoppingListItem:
 *       type: object
 *       required:
 *         - recipeIngredientId
 *         - isPurchased
 *         - createdAt
 *         - updatedAt
 *         - familyId
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated ID
 *         isPurchased:
 *           type: boolean
 *           description: Whether the item has been purchased
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date and time of creation
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date and time of last update
 *         familyId:
 *           type: integer
 *           description: ID of the family
 *         recipeIngredientId:
 *           type: integer
 *           description: ID of the recipe ingredient
 *         recipe_ingredient:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: Auto-generated ID
 *             quantity:
 *               type: number
 *               description: Quantity of the ingredient
 *             unitOfMeasure:
 *               type: string
 *               description: Unit of measure for the ingredient
 *             createdAt:
 *               type: string
 *               format: date-time
 *               description: Date and time of creation
 *             updatedAt:
 *               type: string
 *               format: date-time
 *               description: Date and time of last update
 *             recipeId:
 *               type: integer
 *               description: ID of the recipe
 *             ingredientId:
 *               type: integer
 *               description: ID of the ingredient
 *             Ingredient:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Auto-generated ID
 *                 name:
 *                   type: string
 *                   description: Name of the ingredient
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Date and time of creation
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: Date and time of last update
 *             Recipe:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Auto-generated ID
 *                 title:
 *                   type: string
 *                   description: Title of the recipe
 *                 instructions:
 *                   type: string
 *                   description: Cooking instructions
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Date and time of creation
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: Date and time of last update
 *       example:
 *         id: 1
 *         isPurchased: false
 *         createdAt: "2024-11-14T12:06:58.268Z"
 *         updatedAt: "2024-11-14T12:06:58.268Z"
 *         familyId: 1
 *         recipeIngredientId: 9
 *         recipe_ingredient:
 *           id: 9
 *           quantity: 500
 *           unitOfMeasure: "grams"
 *           createdAt: "2024-11-14T11:54:21.801Z"
 *           updatedAt: "2024-11-14T11:54:21.801Z"
 *           recipeId: 2
 *           ingredientId: 1
 *           Ingredient:
 *             id: 1
 *             name: "Tomato"
 *             createdAt: "2024-11-14T11:54:21.797Z"
 *             updatedAt: "2024-11-14T11:54:21.797Z"
 *           Recipe:
 *             id: 2
 *             title: "Tomato Soup"
 *             instructions: "Cook tomatoes, blend, season, and serve"
 *             createdAt: "2024-11-14T11:54:21.799Z"
 *             updatedAt: "2024-11-14T11:54:21.799Z"
 */
const ShoppingListItem = sequelize.define('shopping_list_items', {
  isPurchased: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

Family.hasMany(ShoppingListItem, {
  foreignKey: 'familyId',
  onDelete: 'CASCADE',
});
ShoppingListItem.belongsTo(Family, {
  foreignKey: 'familyId',
  onDelete: 'CASCADE',
});
RecipeIngredient.hasMany(ShoppingListItem, {
  foreignKey: 'recipeIngredientId',
  onDelete: 'CASCADE',
});
ShoppingListItem.belongsTo(RecipeIngredient, {
  foreignKey: 'recipeIngredientId',
  onDelete: 'CASCADE',
});

module.exports = ShoppingListItem;
