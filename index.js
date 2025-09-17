// server.js
const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");
const crypto = require("crypto");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// MongoDB connection (appointments DB)
mongoose.connect("mongodb://127.0.0.1:27017/appointments", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected to appointments DB"))
.catch((err) => console.log("MongoDB connection error:", err));

// Schema & model (bookings collection)
const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  pincode: String,
  orderId: String,
  paymentId: String,
  amount: Number,
  currency: String,
  status: String,
  createdAt: { type: Date, default: Date.now },
});

const Booking = mongoose.model("Booking", bookingSchema, "bookings");

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay order
app.post("/order", async (req, res) => {
  try {
    const { amount, currency, receipt } = req.body;

    const options = {
      amount: amount,
      currency: currency || "INR",
      receipt: receipt || "receipt#1",
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);

    res.json(order);
  } catch (err) {
    console.error("Order creation error:", err);
    res.status(500).json({ msg: "Error creating order" });
  }
});

// Validate payment & save booking
app.post("/order/validate", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      name,
      email,
      phone,
      address,
      pincode,
      amount,
      currency,
    } = req.body;

    // Verify signature
    const sha = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = sha.digest("hex");

    if (digest !== razorpay_signature) {
      return res.status(400).json({ msg: "Transaction not valid" });
    }

    // Save booking
    const newBooking = new Booking({
      name,
      email,
      phone,
      address,
      pincode,
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      amount,
      currency,
      status: "paid",
    });

    await newBooking.save();

    res.json({
      msg: "Payment verified & booking saved!",
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    });
  } catch (err) {
    console.error("Validation error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
