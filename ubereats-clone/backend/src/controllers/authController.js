const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// สมัครสมาชิก
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // เช็คว่ามีอีเมลนี้ในระบบหรือยัง
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "Email already registered" });

    // สร้าง User ใหม่
    const user = await User.create({ name, email, password, role });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 ล็อกอิน
exports.login = async (req, res) => {
  try {
      const { email, password } = req.body;

      // ค้นหาผู้ใช้
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "Invalid email or password" });

      // ตรวจสอบรหัสผ่าน
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

      // สร้าง JWT Token
      const token = jwt.sign(
          { id: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "7d" }
      );

      res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

