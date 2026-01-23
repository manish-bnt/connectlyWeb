const Otp = require("../models/Otp")
const transporter = require("../utils/email")
const User = require("../models/user.js")
const PendingUser = require("../models/pendingUser.js")
const { generateAndSendOtp } = require("../service/generateOtp.js")

//welcome message for new user
async function sendWelcomeEmail(email, username) {

  //write an email
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Welcome to Our Platform!",
    html: `
    <div style="font-family: Arial;">
    <h1 style="color:rgba(0,0,0,0.8)">Hello ${username}</h1>
    <p>Thank you for signing up. We’re excited to have you with us.</p>
    <p>
    Best regards,<br/>
    <strong>Connectly</strong>
    </p>
    <div>
    `
  }

  try {
    //send an email
    await transporter.sendMail(mailOptions)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}


async function requestOtp(req, res) {
  const { email, purpose } = req.body

  // validation checks (User / PendingUser)

  // RESET PASSWORD
  if (purpose === 'reset-pass') {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ msg: 'User not found' })
    }
  }

  //SIGN UP

  if (purpose === 'signup') {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(409).json({ msg: 'User already exists' })
    }
  }

  const otpDoc = await generateAndSendOtp(email, purpose)

  return res.status(200).json({
    msg: 'OTP sent',
    data: otpDoc
  })
}


module.exports = { sendWelcomeEmail, requestOtp }
