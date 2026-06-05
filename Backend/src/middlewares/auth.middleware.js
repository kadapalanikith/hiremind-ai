const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.model");

async function authUser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Authentication required. Please log in." });
  }

  try {
    // Check blacklist first
    const isTokenBlacklisted = await tokenBlacklistModel.findOne({ token }).lean();

    if (isTokenBlacklisted) {
      return res.status(401).json({ message: "Session expired. Please log in again." });
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Session expired. Please log in again." });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid authentication token." });
    }
    next(error);
  }
}

module.exports = { authUser };
