const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Restaurant = require("../models/Restaurant");

// 📌 Create Booking (จองโต๊ะร้านอาหาร)
router.post("/", async (req, res) => {
    try {
        const { restaurantId, userId, date, time, tableNumber } = req.body;

        // ตรวจสอบว่าร้านอาหารมีอยู่จริงหรือไม่
        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });

        // ตรวจสอบว่าโต๊ะมีอยู่จริงหรือไม่
        if (tableNumber > restaurant.tables || tableNumber < 1) {
            return res.status(400).json({ message: "Invalid table number" });
        }

        // บันทึกการจอง
        const booking = new Booking({ restaurant: restaurantId, userId, date, time, tableNumber });
        await booking.save();
        res.status(201).json({ message: "Table booked successfully", booking });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 📌 Get All Bookings
router.get("/", async (req, res) => {
    try {
        const bookings = await Booking.find().populate("restaurant");
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 📌 Cancel Booking
router.delete("/:id", async (req, res) => {
    try {
        await Booking.findByIdAndDelete(req.params.id);
        res.json({ message: "Booking cancelled" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

