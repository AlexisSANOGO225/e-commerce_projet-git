const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');

// Get all orders (with user and product details)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('products.product', 'name price');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate('products.product', 'name price');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Create new order
exports.createOrder = async (req, res) => {
  try {
    const { user, products, total, status } = req.body;
    const order = new Order({ user, products, total, status });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update order
exports.updateOrder = async (req, res) => {
  try {
    const { user, products, total, status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { user, products, total, status },
      { new: true, runValidators: true }
    );
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete order
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json({ message: 'Order deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get order history for a user
exports.getOrderHistoryByUser = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId })
      .populate('products.product', 'name price')
      .sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
