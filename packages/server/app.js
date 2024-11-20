// src/app.js
const express = require('express');
const app = express();
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '../../.env') });

app.use(cors());
// Swagger options
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'NLAPI Guide API',
      version: '1.0.0',
      description: 'API documentation for NLAPI Guide',
    },
    servers: [
      {
        url: 'http://localhost:3303',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js', './models/*.js'],
};

// Initialize Swagger JSDoc
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Save the latest swagger docs to a file
const swaggerOutputPath = path.join(
  __dirname,
  `./${process.env.NLAPI_SCHEMA_NAME}.swagger.json`
);
fs.writeFileSync(
  swaggerOutputPath,
  JSON.stringify(swaggerDocs, null, 2),
  'utf-8'
);

// Swagger UI setup
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware to parse JSON
app.use(express.json());

// Routes
const userRoutes = require('./routes/userRoutes');
const familyRoutes = require('./routes/familyRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const nlapiRoutes = require('./routes/nlapiRoutes');
const ingredientRoutes = require('./routes/ingredientRoutes');
const recipeRoutes = require('./routes/recipeRoutes');

app.use('/api/users', userRoutes);
app.use('/api/families', familyRoutes);
app.use('/api/session', sessionRoutes);
app.use('/api/nlapi', nlapiRoutes);
app.use('/api/ingredients', ingredientRoutes);
app.use('/api/recipes', recipeRoutes);

module.exports = app;
