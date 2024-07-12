require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const {startMessageConsumer} = require('./config/kafka');
const { initSocket } = require('./services/realTimeService');
const authRoutes = require('./routes/authRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('./swagger');


const app = express();

const mongoUrl = process.env.MONGO_URL;

// Connect to MongoDB
connectDB(mongoUrl);

// Initialize Kafka
startMessageConsumer();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notifications', notificationRoutes);

// Swagger setup
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Initialize WebSocket
initSocket(server);
