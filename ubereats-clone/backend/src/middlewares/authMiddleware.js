const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) return res.status(401).json({ message: "Unauthorized, no token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // ✅ เช็คว่า Token ถูกต้อง
    req.user = await User.findById(decoded.id).select("-password");
    
    if (!req.user) return res.status(401).json({ message: "Unauthorized, user not found" });

    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized, invalid token" });
  }
};
