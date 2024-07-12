const Notification = require('../models/Notification');
const { produceMessage } = require('../config/kafka');

const sendNotification = async (notification) => {
  try {
    await produceMessage(notification);
    console.log('Notification sent to Kafka:', notification);
  } catch (err) {
    console.error('Failed to send notification to Kafka', err);
  }
};

const createNotification = async (userId, message) => {
  const notification = new Notification({ userId, message });
  await notification.save();
  return notification;
};

const getNotifications = async (userId) => {
  return await Notification.find({ userId });
};

const getNotificationById = async (id) => {
  return await Notification.findById(id);
};

const markAsReadService = async (id) => {
  const notification = await Notification.findById(id);
  notification.read = true;
  await notification.save();
  return notification;
};

module.exports = { createNotification, getNotifications, getNotificationById, markAsReadService, sendNotification };
