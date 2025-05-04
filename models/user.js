// models/User.js (or models/user.js — keep lowercase for convention)
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    gender: {
      type: String,
      required: true,
      enum: ['male', 'female'],
    },
    resetPasswordToken: {
      type: String,
      default: '',
    },
    resetPasswordOtp: {
      type: String,
      default: '',
    },
    resetPasswordOtpExpiry: {
      type: String,
      default: '',
    },
    resetPasswordExpiry: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// ✅ Check if model already exists
module.exports = mongoose.models.User || mongoose.model('User', userSchema);
