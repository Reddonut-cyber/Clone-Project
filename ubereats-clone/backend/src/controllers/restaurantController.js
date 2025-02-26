const Restaurant = require("../models/Restaurant");

// เพิ่มร้านอาหารใหม่
exports.createRestaurant = async (req, res) => {
  try {
    const { name, description, location, tables } = req.body; // ✅ ต้องมี tables

    const newRestaurant = await Restaurant.create({
      name,
      description,
      location,
      tables, // ✅ ต้องมี tables
      owner: req.user.id,
    });

    res.status(201).json({ message: "Restaurant created", restaurant: newRestaurant });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ดึงร้านอาหารทั้งหมด
exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ดึงข้อมูลร้านอาหารตาม ID
exports.getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });

    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// อัปเดตร้านอาหาร
exports.updateRestaurant = async (req, res) => {
  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRestaurant) return res.status(404).json({ message: "Restaurant not found" });

    res.status(200).json({ message: "Restaurant updated", restaurant: updatedRestaurant });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ลบร้านอาหาร
exports.deleteRestaurant = async (req, res) => {
  try {
    const deletedRestaurant = await Restaurant.findByIdAndDelete(req.params.id);
    if (!deletedRestaurant) return res.status(404).json({ message: "Restaurant not found" });

    res.status(200).json({ message: "Restaurant deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

