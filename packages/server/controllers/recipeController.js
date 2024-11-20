const { Recipe, RecipeIngredient, Ingredient } = require('../models');
const { Op } = require('sequelize');

exports.createRecipe = async (req, res) => {
  try {
    const { title, instructions, recipeIngredients } = req.body;
    if (!recipeIngredients || !Array.isArray(recipeIngredients)) {
      return res.status(400).json({ error: 'Invalid recipe ingredients' });
    }
    const recipe = await Recipe.create({ title, instructions });
    for (const ingredient of recipeIngredients) {
      let ingredientId = ingredient.ingredientId;
      if (!ingredientId) {
        const newIngredient = await Ingredient.create({
          name: ingredient.ingredient_name,
        });
        ingredientId = newIngredient.id;
      }
      await RecipeIngredient.create({
        ...ingredient,
        recipeId: recipe.id,
        ingredientId,
      });
    }
    res.status(201).json(recipe);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: `Failed to create recipe: ${error.message}` });
  }
};

exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.findAll();
    res.status(200).json(recipes);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to retrieve recipes: ${error.message}` });
  }
};

exports.getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const recipe = await Recipe.findByPk(id, {
      include: [{ model: RecipeIngredient, include: [{ model: Ingredient }] }],
    });
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    res.status(200).json(recipe);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: `Failed to retrieve recipe: ${error.message}` });
  }
};

exports.updateRecipe = async (req, res) => {
  try {
    res.status(400).json({ error: 'Not implemented yet' });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to update recipe: ${error.message}` });
  }
};

exports.deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findByPk(id);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    await recipe.destroy();
    res.status(204).send();
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to delete recipe: ${error.message}` });
  }
};

exports.searchRecipes = async (req, res) => {
  try {
    const { query } = req.query;
    const recipes = await Recipe.findAll({
      where: {
        title: {
          [Op.like]: `%${query}%`,
        },
      },
    });
    res.status(200).json(recipes);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to search recipes: ${error.message}` });
  }
};
