const { Recipe, RecipeIngredient, Ingredient } = require('../models');
const { fn, col } = require('sequelize');

exports.createRecipe = async (req, res) => {
  try {
    const { title, instructions } = req.body;
    const recipe = await Recipe.create({ title, instructions });
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
    const { offset = 0, limit = 10 } = req.query;

    const { count, rows: recipes } = await Recipe.findAndCountAll({
      distinct: true,
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 0),
      include: [
        {
          model: RecipeIngredient,
          as: 'recipeIngredients',
          include: [
            {
              model: Ingredient,
              as: 'ingredient',
            },
          ],
        },
      ],
    });

    res.status(200).json({
      totalItems: count,
      currentOffset: parseInt(offset),
      recipes,
    });
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
      include: [
        {
          model: RecipeIngredient,
          as: 'recipeIngredients',
          include: [
            {
              model: Ingredient,
              as: 'ingredient',
            },
          ],
        },
      ],
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
    const { id } = req.params;
    const { title, instructions } = req.body;
    const recipe = await Recipe.findByPk(id);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    await recipe.update({ title, instructions });
    res.status(200).json(recipe);
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
  // NOTE: This search could be improved by vectorizing the recipe instructions and ingredients to create a better search experience. This example is just a simple search by title.
  const { query, searchBy = 'title', limit = 3 } = req.query;
  console.log(query, searchBy, limit);
  if (!['title'].includes(searchBy)) {
    return res
      .status(400)
      .json({ error: 'Invalid searchBy parameter. Use "title".' });
  }

  try {
    const searchRecipes = await Recipe.findAll({
      order: [[fn('similarity', col(searchBy), query), 'DESC']],
      limit: parseInt(limit, 10),
      include: [
        {
          model: RecipeIngredient,
          as: 'recipeIngredients',
          include: [
            {
              model: Ingredient,
              as: 'ingredient',
            },
          ],
        },
      ],
    });

    return res.json(searchRecipes);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: `Failed to Search Recipes: ${err.message}` });
  }
};
