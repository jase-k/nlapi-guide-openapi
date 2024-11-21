const { ShoppingListItem, RecipeIngredient } = require('../models');

exports.createShoppingListItem = async (req, res) => {
  try {
    const { recipeIngredientId, recipeId } = req.body;
    const familyId = req.user.familyId;
    let shoppingListItems = [];
    if (recipeIngredientId) {
      shoppingListItems.push(
        await ShoppingListItem.create({ recipeIngredientId, familyId })
      );
    } else if (recipeId) {
      const recipeIngredients = await RecipeIngredient.findAll({
        where: { recipeId },
      });
      recipeIngredients.forEach(async (recipeIngredient) => {
        // Note: Create Many would be more efficient here
        shoppingListItems.push(
          await ShoppingListItem.create({
            recipeIngredientId: recipeIngredient.id,
            familyId,
          })
        );
      });
    }
    res.status(201).json(shoppingListItems);
  } catch (error) {
    console.error('Error in createShoppingListItem', error);
    if (error.name === 'SequelizeForeignKeyConstraintError') {
      res.status(400).json({ error: 'Recipe Ingredient does not exist.' });
    } else {
      res
        .status(500)
        .json({ error: `Failed to create shopping list item: ${error}` });
    }
  }
};

exports.getAllShoppingListItems = async (req, res) => {
  try {
    const shoppingListItems = await ShoppingListItem.findAll({
      where: { familyId: req.user.familyId },
      include: {
        model: RecipeIngredient,
        include: ['ingredient', 'recipe'],
      },
    });
    res.status(200).json(shoppingListItems);
  } catch (error) {
    console.error('Error in getAllShoppingListItems', error);
    res
      .status(500)
      .json({ error: `Failed to retrieve shopping list items: ${error}` });
  }
};

exports.deleteAllShoppingListItems = async (req, res) => {
  try {
    await ShoppingListItem.destroy({
      where: { familyId: req.user.familyId },
    });
    res
      .status(200)
      .json({ message: 'All shopping list items deleted successfully' });
  } catch (error) {
    console.error('Error in deleteAllShoppingListItems', error);
    res.status(500).json({ error: 'Failed to delete shopping list items' });
  }
};
