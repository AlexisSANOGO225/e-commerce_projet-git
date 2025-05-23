const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// GET all orders
router.get('/', orderController.getAllOrders);

// GET order by ID
router.get('/:id', orderController.getOrderById);

// POST create order
router.post('/', orderController.createOrder);

// PUT update order
router.put('/:id', orderController.updateOrder);

// DELETE order
router.delete('/:id', orderController.deleteOrder);

// GET order history by user
router.get('/history/:userId', orderController.getOrderHistoryByUser);

module.exports = router;
