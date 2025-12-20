const express = require("express");
const { authenticate } = require("../middleware/authMiddleware");
const router = express.Router();

const {placeOrder , getMyOrders} =require("../controllers/orderController")


router.post("/", authenticate, placeOrder);    
router.get("/my", authenticate, getMyOrders);    


module.exports = router;