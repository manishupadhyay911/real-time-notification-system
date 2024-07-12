# Real-Time Notification System

This is a microservices-based real-time notification system using Node.js, Express, MongoDB, Kafka, and WebSocket. The system handles high-volume message processing and delivers real-time notifications to users.

## Features

- User registration and authentication using JWT.
- Notification creation and management.
- Real-time notification delivery using Kafka and WebSocket.
- API documentation with Swagger.

## Technologies Used

- Node.js
- Express
- MongoDB (with Mongoose)
- Kafka (KafkaJS)
- WebSocket (Socket.IO)
- JWT (JSON Web Token)
- Docker & Docker Compose

## Prerequisites

- Docker and Docker Compose installed on your machine.

## Getting Started

Follow these steps to get the project up and running:

### 1. Clone the Repository

```sh
git clone https://github.com/manishupadhyay911/real-time-notification-system.git
cd real-time-notification-system
```

### 3. Build and Run the Docker Containers
```sh
docker-compose up --build
```
This will start the following services:

app: The Node.js application running on port 5000.
mongo: The MongoDB database running on port 27017.
kafka: The Kafka broker running on port 9093.
zookeeper: The Zookeeper service running on port 2182.

### 4. Access the Application
The Node.js application will be running at http://localhost:5000.
The MongoDB instance will be accessible at mongodb://localhost:27017.
The Kafka broker will be accessible at localhost:9093.

### 5. API Endpoints
Auth Service
- POST /api/register: Register a new user.
- POST /api/login: Login and receive a JWT.

Notification Service
- POST /api/notifications: Create a new notification for a user.
- GET /api/notifications: Get a list of all notifications for the authenticated user.
- GET /api/notifications/:id: Get details of a specific notification.
- PUT /api/notifications/:id: Mark a notification as read.

### 6. Real-Time Service
- The WebSocket server is set up to listen for new notifications from the Kafka queue and broadcast them to connected users in real time.
- To connect user using websocket, emit event "connection" from Postman
- To receive realtime notification, listen to event "notification" from Postman

### 7. Swagger API Documentation
- API documentation is available at http://localhost:5000/api-docs.