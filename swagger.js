const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Define the Swagger options
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Power Plants API',
      version: '1.0.0',
      description: 'API for managing power plants data',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local development server',
      },
    ],
  },
  apis: ['./routes.js'], // Update this with the correct path to your routes file
};

// Initialize Swagger-jsdoc
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Setup Swagger UI
module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

  // Generate Swagger.json file
  app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerDocs);
  });
};
