const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    encryptedPassword: { type: String, required: true },
    role: { type: String, enum: ["tenant", "landlord"] },
    // phone: { },
    profilePhoto: { type: String }
  },
  {
    // additional settings for Schema class here
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
