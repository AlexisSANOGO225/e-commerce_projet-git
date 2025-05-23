const Product = require('../models/Product');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Create new product
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, imageUrl, stock } = req.body;
    const product = new Product({ name, description, price, category, imageUrl, stock });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, imageUrl, stock } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, category, imageUrl, stock },
      { new: true, runValidators: true }
    );
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
