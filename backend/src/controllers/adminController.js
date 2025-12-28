const Product = require("../models/Product");
const Order = require("../models/Order");

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
      await Product.findByIdAndDelete(req.params.id);
      res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//orders
exports.getOrders = async (req, res) => {
    try {
      const orders = await Order.find().populate("user", "name email");
      res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
      const order = await Order.findById(req.params.id);
      order.status = req.body.status;
      await order.save();
      res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
