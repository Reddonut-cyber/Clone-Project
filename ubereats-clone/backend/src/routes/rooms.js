const express = require("express");
const router = express.Router();

// Mock database
let rooms = [];

// 📌 Create Room
router.post("/", (req, res) => {
    const { name, capacity, location } = req.body;
    const newRoom = {
        id: rooms.length + 1,
        name,
        capacity,
        location,
    };
    rooms.push(newRoom);
    res.status(201).json({ message: "Room created", room: newRoom });
});

// 📌 Get All Rooms
router.get("/", (req, res) => {
    res.json(rooms);
});

// 📌 Get Single Room
router.get("/:id", (req, res) => {
    const room = rooms.find((r) => r.id === parseInt(req.params.id));
    if (!room) return res.status(404).json({ message: "Room not found" });
    res.json(room);
});

// 📌 Update Room
router.put("/:id", (req, res) => {
    let room = rooms.find((r) => r.id === parseInt(req.params.id));
    if (!room) return res.status(404).json({ message: "Room not found" });

    const { name, capacity, location } = req.body;
    room = { ...room, name, capacity, location };
    rooms = rooms.map((r) => (r.id === room.id ? room : r));

    res.json({ message: "Room updated", room });
});

// 📌 Delete Room
router.delete("/:id", (req, res) => {
    rooms = rooms.filter((r) => r.id !== parseInt(req.params.id));
    res.json({ message: "Room deleted" });
});

module.exports = router;

