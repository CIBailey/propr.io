const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    encryptedPassword: { type: String, required: true },
    role: { type: String, enum: ["Tenant", "Landlord"], required: true },
    phone: { type: Number, required: true },
    profilePhoto: { type: String, required: true }
  },
  {
    // additional settings for Schema class here
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
