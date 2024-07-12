const express = require('express');
const { create, getAll, getById, markAsRead } = require('../controllers/notificationController');
const auth = require('../middleware/auth');
const router = express.Router();

/**
 * @swagger
 * /api/notifications:
 *   post:
 *     summary: Create a new notification for a user
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *             properties:
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Notification created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', auth, create);

/**
 * @swagger
 * /api/notifications:
 *   get:
 *     summary: Get a list of all notifications for the authenticated user
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of notifications
 *       400:
 *         description: Bad request
 */
router.get('/', auth, getAll);

/**
 * @swagger
 * /api/notifications/{id}:
 *   get:
 *     summary: Get details of a specific notification
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notification details
 *       404:
 *         description: Notification not found
 */
router.get('/:id', auth, getById);

/**
 * @swagger
 * /api/notifications/{id}:
 *   put:
 *     summary: Mark a notification as read
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notification marked as read
 *       404:
 *         description: Notification not found
 */
router.put('/:id', auth, markAsRead);

module.exports = router;
