const express = require("express");
const router = express.Router();

const {
  authenticate,
  authorizeAdmin,
} = require("../middleware/authMiddleware");
const {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getOrders,
  updateOrderStatus,
} = require("../controllers/adminController");

//products
router.get("/products", authenticate, authorizeAdmin, getProducts);
router.post("/new-product", authenticate, authorizeAdmin, addProduct);
router.put("/update-product/:id", authenticate, authorizeAdmin, updateProduct);
router.delete(
  "/delete-product/:id",
  authenticate,
  authorizeAdmin,
  deleteProduct
);

//orders
router.get("/orders", authenticate, authorizeAdmin, getOrders);
router.put(
  "/update-order/:id",
  authenticate,
  authorizeAdmin,
  updateOrderStatus
);

module.exports = router;
