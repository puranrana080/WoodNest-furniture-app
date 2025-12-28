const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require('mongoose')
const bcrypt = require("bcrypt");
const User = require("./src/models/User")

const authRoutes = require("./src/routes/authRoutes");
const productRoutes = require("./src/routes/productRoutes")
const orderRoutes = require("./src/routes/orderRoutes")
const adminRoutes = require("./src/routes/adminRoutes")

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
app.use("/api/admin",adminRoutes)


const seedAdmin = async () => {
  const adminEmail = process.env.ADMIN_EMAIL;

  if (await User.findOne({ email: adminEmail })) return;

  await User.create({
    name: "Admin",
    email: adminEmail,
    password: await bcrypt.hash(process.env.ADMIN_PASSWORD, 10),
    role: "admin",
  });

  console.log("Admin user created");
};


const PORT = process.env.PORT ;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await seedAdmin();
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed", err.message);
    process.exit(1);
  }
});
