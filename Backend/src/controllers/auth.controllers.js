const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const tokenBlacklistModel = require("../models/blacklist.model");
const jwt = require("jsonwebtoken");

const isProduction = process.env.NODE_ENV === "production";

const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */
async function registerUserController(req, res, next) {
  try {
    const { username, email, password } = req.body;

    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please provide username, email and password" });
    }

    // Validate password length
    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters" });
    }

    // Validate email format
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Please enter a valid email address" });
    }

    // Check for existing account
    const existing = await userModel.findOne({ $or: [{ username }, { email }] });
    if (existing) {
      return res.status(400).json({ message: "Account already exists with this username or email" });
    }

    const hash = await bcrypt.hash(password, 12); // Increased to 12 rounds for stronger hashing

    const user = await userModel.create({ username, email, password: hash });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.cookie("token", token, cookieOptions);

    return res.status(201).json({
      message: "User registered successfully",
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @route POST /api/auth/login
 * @description Login an existing user
 * @access Public
 */
async function loginUserController(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

    const user = await userModel.findOne({ email });

    // Use generic message to prevent user enumeration attacks
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.cookie("token", token, cookieOptions);

    return res.status(200).json({
      message: "User logged in successfully",
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @route POST /api/auth/logout
 * @description Clear token from user cookie and add it to the token blacklist
 * @access Private
 */
async function logoutUserController(req, res, next) {
  try {
    const token = req.cookies.token;

    if (token) {
      // Only blacklist if not already present (prevent duplicate key errors)
      await tokenBlacklistModel.findOneAndUpdate(
        { token },
        { token },
        { upsert: true, setDefaultsOnInsert: true }
      );
    }

    res.clearCookie("token", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    });

    return res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    next(error);
  }
}

/**
 * @route GET /api/auth/me
 * @description Get the currently logged in user's information
 * @access Private
 */
async function getMeController(req, res, next) {
  try {
    const user = await userModel.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User retrieved successfully",
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  registerUserController,
  loginUserController,
  logoutUserController,
  getMeController,
};
