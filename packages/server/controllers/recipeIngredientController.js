const { RecipeIngredient, Ingredient } = require('../models');

exports.createRecipeIngredient = async (req, res) => {
  try {
    const { recipeId, ingredientId, quantity, unitOfMeasure, ingredientName } =
      req.body;
    let newIngredientId = null;
    if (ingredientName) {
      const ingredient = await Ingredient.findOrCreate({
        where: { name: ingredientName },
      });
      newIngredientId = ingredient[0].id;
    }
    const recipeIngredient = await RecipeIngredient.create({
      recipeId,
      ingredientId: newIngredientId || ingredientId,
      quantity,
      unitOfMeasure,
    });
    res.status(201).json(recipeIngredient);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(422).json({
        error: 'Recipe and Ingredient combination already exists',
      });
    }
    console.log(error);
    res
      .status(500)
      .json({ error: `Failed to create recipe ingredient: ${error.message}` });
  }
};

exports.deleteRecipeIngredient = async (req, res) => {
  try {
    const { id } = req.params;
    const recipeIngredient = await RecipeIngredient.findByPk(id);
    if (!recipeIngredient) {
      return res.status(404).json({ error: 'Recipe ingredient not found' });
    }
    await recipeIngredient.destroy();
    res.status(204).send();
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to delete recipe ingredient: ${error.message}` });
  }
};
