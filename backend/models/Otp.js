const mongoose = require('mongoose')

const otpSchema = new mongoose.Schema({
  email: String,
  otp: String,
  expiresAt: {
    type: Date,
    default: () => Date.now() + 60 * 1000
  },

  purpose: {
    type: String,
    enum: ['signup', 'reset-pass'],
    required: true
  }

})

module.exports = mongoose.model("Otp", otpSchema)