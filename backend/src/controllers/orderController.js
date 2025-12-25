const Order = require("../models/Order");
const User = require("../models/User");

//place order
exports.placeOrder = async (req, res) => {
  try {
    const { items, total, address } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in order" });
    }

    if (
      !address?.name ||
      !address?.phone ||
      !address?.address ||
      !address?.city ||
      !address?.state ||
      !address?.pincode
    ) {
      return res.status(400).json({ message: "Address is incomplete" });
    }

    const order = await Order.create({
      user: req.user.id,
      items,
      address,
      totalAmount: total,
      paymentMethod: "COD",
    });

    // Save address to user's addresses
    await User.findByIdAndUpdate(req.user.id, { $push: { addresses: address } });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//get logged in user orders
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate("items.product", "name price");

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
