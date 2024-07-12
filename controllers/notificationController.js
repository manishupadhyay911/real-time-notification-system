const { sendNotification, getNotifications, getNotificationById, markAsReadService } = require('../services/notificationService');

const create = async (req, res) => {
  try {
    const { message } = req.body;
    console.log("user: ",req.user._id.toString());
    await sendNotification({userId: req.user._id.toString(), message});

    res.status(201).json({
      message,
      userId: req.user._id.toString()
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAll = async (req, res) => {
  try {
    const notifications = await getNotifications(req.user._id);
    res.status(200).json(notifications);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const notification = await getNotificationById(req.params.id);
    res.status(200).json(notification);
  } catch (err) {
    res.status(404).json({ message: 'Notification not found' });
  }
};

const markAsRead = async (req, res) => {
  try {
    const notification = await markAsReadService(req.params.id);
    res.status(200).json(notification);
  } catch (err) {
    res.status(404).json({ message: 'Notification not found' });
  }
};

module.exports = { create, getAll, getById, markAsRead };
