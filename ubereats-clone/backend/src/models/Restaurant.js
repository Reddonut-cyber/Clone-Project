const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    location: { type: String, required: true },
    tables: { type: Number, required: true } // ✅ ต้องมี required: true
}, { timestamps: true });

module.exports = mongoose.model("Restaurant", RestaurantSchema);
