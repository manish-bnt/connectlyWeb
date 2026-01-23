// services/otpService.js
/*
const Otp = require('../models/Otp.js')
const User = require('../models/user.js')
const transporter = require('../utils/email.js')

async function generateAndSendOtp(email, purpose) {

  const otp = Math.floor(10000 + Math.random() * 90000)

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: '[Connectly] OTP Verification',
    html: `<p>Your OTP is <strong>${otp}</strong></p>`
  })

  const otpDoc = await Otp.create({
    email,
    otp,
    purpose,
    expiresAt: Date.now() + 60 * 1000
  })

  return otpDoc
}

module.exports = { generateAndSendOtp }

*/



