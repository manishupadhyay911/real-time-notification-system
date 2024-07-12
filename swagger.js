const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Real-Time Notification System API',
        version: '1.0.0',
        description: 'API documentation for the real-time notification system',
      },
      servers: [
        {
          url: 'http://localhost:5000',
        },
      ],
    },
    apis: ['./routes/*.js'],
  };
  
  module.exports = swaggerOptions;
  