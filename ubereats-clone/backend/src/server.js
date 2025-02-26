const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
require("dotenv").config();
const mongoose = require("mongoose");

// 📌 Import Routes
const authRoutes = require("./routes/authRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const bookingRoutes = require("./routes/bookings");

// 📌 Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("🔥 MongoDB Connected"))
    .catch(err => console.error(err));

// Middlewares
app.use(express.json());

// 📌 Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/bookings", bookingRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
