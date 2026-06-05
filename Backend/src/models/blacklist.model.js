const mongoose = require("mongoose");

const blacklistTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: [true, "Token is required"],
      unique: true,
    },
    // TTL: auto-expire tokens after 7 days (matching JWT lifetime)
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      index: { expires: 0 }, // MongoDB TTL index
    },
  },
  {
    timestamps: true,
  }
);

const tokenBlacklistModel = mongoose.model("Blacklist", blacklistTokenSchema);

module.exports = tokenBlacklistModel;
