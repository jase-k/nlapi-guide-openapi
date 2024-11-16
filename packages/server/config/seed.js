const sequelize = require('./database');
const { User, Family } = require('../models');

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

    console.log('Seeding successful!');
  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    // Close the database connection
    await sequelize.close();
  }
}

seedDatabase();
