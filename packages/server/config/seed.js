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
      { name: 'Chicken Breast' },
      { name: 'Pasta' },
      { name: 'Alfredo Sauce' },
      { name: 'Coconut Milk' },
      { name: 'Tortillas' },
      { name: 'Mozzarella Cheese' },
      { name: 'Bread' },
      { name: 'Eggs' },
      { name: 'Lemon' },
      { name: 'Shrimp' },
      { name: 'Butter' },
      { name: 'Bacon' },
      { name: 'Zucchini' },
      { name: 'Eggplant' },
      { name: 'Banana' },
      { name: 'Flour' },
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
      {
        title: 'Chicken Curry',
        instructions: 'Cook chicken, add spices, simmer with coconut milk',
      },
      {
        title: 'Beef Stew',
        instructions: 'Brown beef, add vegetables, simmer until tender',
      },
      {
        title: 'Caesar Salad',
        instructions: 'Mix lettuce, croutons, and Caesar dressing',
      },
      {
        title: 'Pancakes',
        instructions: 'Mix batter, cook on griddle, serve with syrup',
      },
      {
        title: 'Grilled Cheese Sandwich',
        instructions: 'Butter bread, add cheese, grill until golden',
      },
      {
        title: 'Vegetable Stir Fry',
        instructions: 'Stir fry vegetables, add soy sauce, serve hot',
      },
      {
        title: 'Chocolate Cake',
        instructions: 'Mix ingredients, bake, and frost with chocolate icing',
      },
      {
        title: 'Lasagna',
        instructions: 'Layer pasta, meat sauce, and cheese, bake until bubbly',
      },
      {
        title: 'Minestrone Soup',
        instructions: 'Cook vegetables, add broth and pasta, simmer',
      },
      {
        title: 'Tacos',
        instructions: 'Cook meat, fill tortillas, add toppings',
      },
      {
        title: 'Chicken Alfredo',
        instructions: 'Cook pasta, prepare Alfredo sauce, mix with chicken',
      },
      {
        title: 'Vegetable Curry',
        instructions:
          'Cook vegetables, add curry spices, simmer with coconut milk',
      },
      {
        title: 'Beef Tacos',
        instructions: 'Cook beef, fill tortillas, add toppings',
      },
      {
        title: 'Margherita Pizza',
        instructions: 'Prepare dough, add tomato sauce and cheese, bake',
      },
      {
        title: 'French Toast',
        instructions:
          'Dip bread in egg mixture, cook on skillet, serve with syrup',
      },
      {
        title: 'Lemon Chicken',
        instructions: 'Cook chicken with lemon juice and herbs',
      },
      {
        title: 'Shrimp Scampi',
        instructions: 'Cook shrimp with garlic and butter, serve with pasta',
      },
      {
        title: 'Quiche Lorraine',
        instructions: 'Prepare crust, fill with egg mixture and bacon, bake',
      },
      {
        title: 'Ratatouille',
        instructions: 'Layer vegetables, bake with herbs and olive oil',
      },
      {
        title: 'Banana Bread',
        instructions: 'Mix ingredients, bake until golden brown',
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
      {
        recipeId: recipes[2].id,
        ingredientId: ingredients[2].id,
        quantity: 300,
        unitOfMeasure: 'grams',
      },
      {
        recipeId: recipes[3].id,
        ingredientId: ingredients[2].id,
        quantity: 500,
        unitOfMeasure: 'grams',
      },
      {
        recipeId: recipes[4].id,
        ingredientId: ingredients[0].id,
        quantity: 100,
        unitOfMeasure: 'grams',
      },
      {
        recipeId: recipes[5].id,
        ingredientId: ingredients[6].id,
        quantity: 1,
        unitOfMeasure: 'teaspoon',
      },
      {
        recipeId: recipes[6].id,
        ingredientId: ingredients[5].id,
        quantity: 1,
        unitOfMeasure: 'tablespoon',
      },
      {
        recipeId: recipes[7].id,
        ingredientId: ingredients[0].id,
        quantity: 200,
        unitOfMeasure: 'grams',
      },
      {
        recipeId: recipes[8].id,
        ingredientId: ingredients[7].id,
        quantity: 1,
        unitOfMeasure: 'teaspoon',
      },
      {
        recipeId: recipes[9].id,
        ingredientId: ingredients[1].id,
        quantity: 200,
        unitOfMeasure: 'grams',
      },
      {
        recipeId: recipes[10].id,
        ingredientId: ingredients[3].id,
        quantity: 1,
        unitOfMeasure: 'piece',
      },
      {
        recipeId: recipes[11].id,
        ingredientId: ingredients[4].id,
        quantity: 2,
        unitOfMeasure: 'cloves',
      },
      {
        recipeId: recipes[12].id,
        ingredientId: ingredients[8].id,
        quantity: 2,
        unitOfMeasure: 'pieces',
      },
      {
        recipeId: recipes[12].id,
        ingredientId: ingredients[9].id,
        quantity: 200,
        unitOfMeasure: 'grams',
      },
      {
        recipeId: recipes[12].id,
        ingredientId: ingredients[10].id,
        quantity: 1,
        unitOfMeasure: 'cup',
      },
      {
        recipeId: recipes[13].id,
        ingredientId: ingredients[3].id,
        quantity: 1,
        unitOfMeasure: 'piece',
      },
      {
        recipeId: recipes[13].id,
        ingredientId: ingredients[4].id,
        quantity: 3,
        unitOfMeasure: 'cloves',
      },
      {
        recipeId: recipes[13].id,
        ingredientId: ingredients[11].id,
        quantity: 1,
        unitOfMeasure: 'can',
      },
      {
        recipeId: recipes[14].id,
        ingredientId: ingredients[2].id,
        quantity: 300,
        unitOfMeasure: 'grams',
      },
      {
        recipeId: recipes[14].id,
        ingredientId: ingredients[12].id,
        quantity: 6,
        unitOfMeasure: 'pieces',
      },
      {
        recipeId: recipes[15].id,
        ingredientId: ingredients[0].id,
        quantity: 100,
        unitOfMeasure: 'grams',
      },
      {
        recipeId: recipes[15].id,
        ingredientId: ingredients[13].id,
        quantity: 150,
        unitOfMeasure: 'grams',
      },
      {
        recipeId: recipes[16].id,
        ingredientId: ingredients[14].id,
        quantity: 4,
        unitOfMeasure: 'slices',
      },
      {
        recipeId: recipes[16].id,
        ingredientId: ingredients[15].id,
        quantity: 2,
        unitOfMeasure: 'pieces',
      },
      {
        recipeId: recipes[17].id,
        ingredientId: ingredients[8].id,
        quantity: 2,
        unitOfMeasure: 'pieces',
      },
      {
        recipeId: recipes[17].id,
        ingredientId: ingredients[16].id,
        quantity: 1,
        unitOfMeasure: 'piece',
      },
      {
        recipeId: recipes[18].id,
        ingredientId: ingredients[17].id,
        quantity: 250,
        unitOfMeasure: 'grams',
      },
      {
        recipeId: recipes[18].id,
        ingredientId: ingredients[18].id,
        quantity: 2,
        unitOfMeasure: 'tablespoons',
      },
      {
        recipeId: recipes[19].id,
        ingredientId: ingredients[19].id,
        quantity: 100,
        unitOfMeasure: 'grams',
      },
      {
        recipeId: recipes[19].id,
        ingredientId: ingredients[15].id,
        quantity: 3,
        unitOfMeasure: 'pieces',
      },
      {
        recipeId: recipes[20].id,
        ingredientId: ingredients[20].id,
        quantity: 1,
        unitOfMeasure: 'piece',
      },
      {
        recipeId: recipes[20].id,
        ingredientId: ingredients[21].id,
        quantity: 1,
        unitOfMeasure: 'piece',
      },
      {
        recipeId: recipes[21].id,
        ingredientId: ingredients[22].id,
        quantity: 3,
        unitOfMeasure: 'pieces',
      },
      {
        recipeId: recipes[21].id,
        ingredientId: ingredients[23].id,
        quantity: 200,
        unitOfMeasure: 'grams',
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
