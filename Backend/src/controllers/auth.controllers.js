const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const tokenBlacklistModel = require("../models/blacklist.model");
const jwt = require("jsonwebtoken");

/**
 * @route RegisterUserController
 * @description Register a new user,exports name,email and password in the request body
 * @access Public
 */

async function registerUserContrller(req, res) {
  const { username, email, password } = req.body;

  if (!username || !password || !email) {
    return res
      .status(400)
      .json({ message: "Please provide username, email and password" });
  }

  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExists) {
    return res.status(400).json({ message: "Account already exists" });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hash,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token);

  return res
    .status(201)
    .json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      }
    });
}

/**
 * @route LoginUserController
 * @description Login an existing user, exports email and password in the request body
 * @access Public
 */

async function loginUserContrller(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token);

  return res.status(200).json({
    message: "User logged in successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

/**
 * @route LogoutUserController
 * @description Clear token from user cookie and add it to the token blacklist
 * @access Public
 */

async function logoutUserContrller(req, res) {
  const token = req.cookies.token;

  if (token) {
    await tokenBlacklistModel.create({ token });
  }

  res.clearCookie("token");

  return res.status(200).json({ message: "User logged out successfully" });
}

/**
 * @route GetMeController
 * @description Get the currently logged in user's information
 * @access Private
 */
async function getMeContrller(req, res) {
  const user = await userModel.findById(req.user.id).select("-password");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json({
    message: "User retrieved successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

module.exports = {
  registerUserContrller,
  loginUserContrller,
  logoutUserContrller,
  getMeContrller,
};
