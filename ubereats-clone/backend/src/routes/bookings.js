const express = require("express");
const router = express.Router();

// Mock database
let bookings = [];

// 📌 Create Booking
router.post("/", (req, res) => {
    const { roomId, userId, date, time } = req.body;
    const newBooking = {
        id: bookings.length + 1,
        roomId,
        userId,
        date,
        time,
    };
    bookings.push(newBooking);
    res.status(201).json({ message: "Booking created", booking: newBooking });
});

// 📌 Get All Bookings
router.get("/", (req, res) => {
    res.json(bookings);
});

// 📌 Get Single Booking
router.get("/:id", (req, res) => {
    const booking = bookings.find((b) => b.id === parseInt(req.params.id));
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json(booking);
});

// 📌 Cancel Booking
router.delete("/:id", (req, res) => {
    bookings = bookings.filter((b) => b.id !== parseInt(req.params.id));
    res.json({ message: "Booking cancelled" });
});

module.exports = router;

