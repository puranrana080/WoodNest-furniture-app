const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require('mongoose')

const authRoutes = require("./src/routes/authRoutes");
const productRoutes = require("./src/routes/productRoutes")
const orderRoutes = require("./src/routes/orderRoutes")

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // Allow frontend origin
  credentials: true
}));
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Backend is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/products",productRoutes)
app.use("/api/orders",orderRoutes)



const PORT = process.env.PORT ;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed", err.message);
    process.exit(1);
  }
});
