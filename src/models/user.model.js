const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: [true, "Username must be unique"],
  },

  email: {
    type: String,
    required: true,
    unique: [true, "Email must be unique"],
  },

  password: {
    type: String,
    required: true,
  },
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
