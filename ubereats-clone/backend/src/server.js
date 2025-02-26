const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());

// Import Routes
const roomRoutes = require("./routes/rooms");
const bookingRoutes = require("./routes/bookings");

// Use Routes
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

