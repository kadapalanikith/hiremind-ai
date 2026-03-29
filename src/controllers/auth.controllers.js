const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");

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
}

module.exports = { registerUserContrller };
