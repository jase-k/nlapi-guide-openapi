const sequelize = require('./database');
const {
  User,
  Family,
  Ingredient,
  Recipe,
  RecipeIngredient,
} = require('../models');

async function seedDatabase() {
  try {
    // Connect to the database
    await sequelize.authenticate();
    console.log('Database connected...');

    // Clear the database
    await sequelize.drop({ cascade: true });
    console.log('Database cleared!');

    // Sync the models
    await sequelize.sync({ force: true });
    console.log('Database & tables synced!');

    // Create a family if it doesn't exist
    const [family, created] = await Family.findOrCreate({
      where: { name: 'Looney Tunes Inc.' },
      defaults: {
        address: '123 Business Rd.',
      },
    });

    // Create users if they don't exist
    const users = [
      {
        name: 'Bugs Bunny',
        email: 'bugs.bunny@example.com',
        password: 'CarrotLover123',
        familyId: family ? family.id : created.id,
      },
      {
        name: 'Daffy Duck',
        email: 'daffy.duck@example.com',
        password: 'QuackQuack123',
        familyId: family ? family.id : created.id,
      },
      {
        name: 'Elmer Fudd',
        email: 'elmer.fudd@example.com',
        password: 'HuntWabbits123',
        familyId: family ? family.id : created.id,
      },
      {
        name: 'Wile E. Coyote',
        email: 'wile.e.coyote@example.com',
        password: 'RoadRunner123',
        familyId: family ? family.id : created.id,
      },
      {
        name: 'Yosemite Sam',
        email: 'yosemite.sam@example.com',
        password: 'RootinTootin123',
        familyId: family ? family.id : created.id,
      },
    ];

    for (const user of users) {
      await User.findOrCreate({
        where: { email: user.email },
        defaults: user,
      });
    }
    // Create ingredients
    const ingredients = await Ingredient.bulkCreate([
      { name: 'Tomato' },
      { name: 'Spaghetti' },
      { name: 'Ground Beef' },
      { name: 'Onion' },
      { name: 'Garlic' },
      { name: 'Olive Oil' },
      { name: 'Salt' },
      { name: 'Pepper' },
    ]);

    // Create recipes
    const recipes = await Recipe.bulkCreate([
      {
        title: 'Spaghetti Bolognese',
        instructions: 'Cook spaghetti, prepare sauce, mix together',
      },
      {
        title: 'Tomato Soup',
        instructions: 'Cook tomatoes, blend, season, and serve',
      },
    ]);

    // Create recipe ingredients
    await RecipeIngredient.bulkCreate([
      {
        recipeId: recipes[0].id,
        ingredientId: ingredients[0].id,
        quantity: 200,
        unitOfMeasure: 'grams',
      },
      {
        recipeId: recipes[0].id,
        ingredientId: ingredients[1].id,
        quantity: 100,
        unitOfMeasure: 'grams',
      },
      {
        recipeId: recipes[0].id,
        ingredientId: ingredients[2].id,
        quantity: 300,
        unitOfMeasure: 'grams',
      },
      {
        recipeId: recipes[0].id,
        ingredientId: ingredients[3].id,
        quantity: 1,
        unitOfMeasure: 'piece',
      },
      {
        recipeId: recipes[0].id,
        ingredientId: ingredients[4].id,
        quantity: 2,
        unitOfMeasure: 'cloves',
      },
      {
        recipeId: recipes[0].id,
        ingredientId: ingredients[5].id,
        quantity: 2,
        unitOfMeasure: 'tablespoons',
      },
      {
        recipeId: recipes[0].id,
        ingredientId: ingredients[6].id,
        quantity: 1,
        unitOfMeasure: 'teaspoon',
      },
      {
        recipeId: recipes[0].id,
        ingredientId: ingredients[7].id,
        quantity: 1,
        unitOfMeasure: 'teaspoon',
      },
      {
        recipeId: recipes[1].id,
        ingredientId: ingredients[0].id,
        quantity: 500,
        unitOfMeasure: 'grams',
      },
      {
        recipeId: recipes[1].id,
        ingredientId: ingredients[3].id,
        quantity: 1,
        unitOfMeasure: 'piece',
      },
      {
        recipeId: recipes[1].id,
        ingredientId: ingredients[4].id,
        quantity: 2,
        unitOfMeasure: 'cloves',
      },
      {
        recipeId: recipes[1].id,
        ingredientId: ingredients[5].id,
        quantity: 1,
        unitOfMeasure: 'tablespoon',
      },
      {
        recipeId: recipes[1].id,
        ingredientId: ingredients[6].id,
        quantity: 1,
        unitOfMeasure: 'teaspoon',
      },
      {
        recipeId: recipes[1].id,
        ingredientId: ingredients[7].id,
        quantity: 1,
        unitOfMeasure: 'teaspoon',
      },
    ]);

    console.log('Seeding successful!');
  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    // Close the database connection
    await sequelize.close();
  }
}

seedDatabase();
