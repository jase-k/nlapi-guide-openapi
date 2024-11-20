const { Ingredient } = require('../models');
const { fn, col } = require('sequelize');

exports.createIngredient = async (req, res) => {
  try {
    const { name } = req.body;
    const ingredient = await Ingredient.create({ name });
    res.status(201).json(ingredient);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to create ingredient: ${error.message}` });
  }
};

exports.getAllIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.findAll();
    res.status(200).json(ingredients);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Failed to retrieve ingredients: ${error.message}` });
  }
};
exports.searchIngredients = async (req, res) => {
  const { query, searchBy = 'name', limit = 3 } = req.query;
  console.log(query, searchBy, limit);
  if (!['name'].includes(searchBy)) {
    return res
      .status(400)
      .json({ error: 'Invalid searchBy parameter. Use "name".' });
  }

  try {
    const searchIngredients = await Ingredient.findAll({
      order: [[fn('similarity', col(searchBy), query), 'DESC']],
      limit: parseInt(limit, 10),
    });

    return res.json(searchIngredients);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: `Failed to Search Ingredients: ${err.message}` });
  }
};
