// src/server.js
const app = require('./app');
const sequelize = require('./config/database');

const PORT = process.env.PORT || 3303;

// Test database connection and start server
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected...');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// After Sync database based on models
// NOTE: for development purposes, set force to true;
// For production, you would likely want to use more robust database versioning with migrations
sequelize
  .sync({ force: false })
  .then(() => {
    console.log('Database & tables synced!');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Unable to sync the database:', err);
  });

// Handle process termination signals
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  app.close(() => {
    console.log('HTTP server closed');
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  app.close(() => {
    console.log('HTTP server closed');
  });
});
