const User = require('../models/user.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Otp = require('../models/Otp.js')
const PendingUser = require('../models/pendingUser.js')
const { generateAndSendOtp } = require('../service/generateOtp.js')

async function registerUser(req, res) {
  const { username, email, password } = req.body

  try {

    // already registered user check
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(409).json({ msg: 'User already exists. Please login.' })
    }

    // pending user already exists (OTP already sent)
    // const pendingExists = await PendingUser.findOne({ email })
    // if (pendingExists) {
    //   return res.status(429).json({ msg: 'OTP already sent. Please wait.' })
    // }

    const hashPassword = await bcrypt.hash(password, 10)

    // create pending user (ttl(time to leave) will auto-clean)
    await User.create({
      username,
      email,
      password: hashPassword
    })

    // Send OTP
    // await generateAndSendOtp(email, 'signup')

    return res.status(200).json({
      msg: 'Signup success!',
      email
    })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ msg: 'Server error' })
  }

}

// ===================== signup verify ===================

/*
async function signupVerify(req, res) {
  try {

    const { otp, email } = req.body
    // console.log("requb doy ", req.body)
    console.log("verifyotp ", otp)
    console.log("verifyemail ", email)

    let otpDocs = await Otp.findOne({ email })
    console.log("otpDocs ", otpDocs)
    if (!otpDocs) {
      return res.status(401).json({ msg: 'invalid otp or expiry' })
    }

    //check otp expiry
    if (otpDocs.expiresAt < Date.now()) {
      await Otp.findOneAndDelete({ email })
      return res.status(401).json({ msg: 'OTP has expired' })
    }

    // check otp match 
    if (otp !== otpDocs.otp) {
      return res.status(401).json({ msg: 'Incorrect Otp' })
    }

    const pendingUser = await PendingUser.findOne({ email })
    if (!pendingUser) {
      return res.status(400).json({ msg: 'Registration data not found' })
    }

    // duplicate user 
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      await PendingUser.deleteOne({ email })
      await Otp.deleteOne({ email })

      return res.status(409).json({
        msg: 'User already exists. Please login.'
      })
    }

    //create acutal user
    const user = new User({
      username: pendingUser.username,
      email: pendingUser.email,
      password: pendingUser.password
    })

    await user.save()

    await PendingUser.deleteOne({ email })
    await Otp.deleteOne({ _id: otpDocs._id })

    return res.status(200).json({ msg: 'User verified and registered successfully' })
  } catch (error) {
    return res.status(500).json({ msg: 'Server error' })
  }

}


//======================== reset password OTP verify ================================

async function verifyOtp(req, res) {
  try {

    // const { OTP, otpId } = req.body
    const { otp, email } = req.body
    console.log("otp ", otp)
    console.log("otp email", email);

    // if (!otpId || !otpId._id) {
    //   return res.status(400).json({ msg: 'OTP reference missing' })
    // }

    let otpDoc = await Otp.findOne({ email }) //otp user document 

    if (!otpDoc) {
      return res.status(401).json({ msg: 'invalid otp or expiry' })
    }

    //check otp expiry 
    if (otpDoc.expiresAt < Date.now()) {
      await Otp.deleteOne({ email })
      return res.status(401).json({ msg: 'OTP has expired' })
    }

    // check otp match 
    if (otp !== otpDoc.otp) {
      return res.status(401).json({ msg: 'Incorrect Otp' })
    }

    //success and delete otp
    // await Otp.findByIdAndDelete(otpUserId.id)
    res.status(200).json({ msg: 'Verified', data: otpDoc })
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ msg: error.message })
  }
}



async function updatePassword(req, res) {
  try {
    const { password, email } = req.body
    console.log("req body ", req.body)
    console.log("cfp ", password, email)
    const hashPassword = await bcrypt.hash(password, 10)
    let user = await User.updateOne(
      { email: email },
      {
        $set: {
          password: hashPassword
        }
      }
    )

    if (!user) {
      return res.status(401).json({ msg: 'user not found!' })
    }
    await Otp.deleteOne({ email: email })
    res.status(200).json({ msg: 'Password changed successfully' })
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ msg: error.message })
  }
}

*/

async function loginUser(req, res) {
  const { email, password } = req.body
  try {
    let loguser = await User.findOne({ email })
    if (!loguser) {
      return res.status(401).json({ msg: 'User not found!' })
    }

    const isMatch = await bcrypt.compare(password, loguser.password)
    // console.log("isMatch ", isMatch)
    if (!isMatch) {
      return res.status(401).json({ msg: "Incorrect Password" })
    }

    // await User.updateOne({ _id: loguser._id }, { $set: { isLog: true } })
    let token = jwt.sign(
      { userId: loguser._id, userLog: true },
      process.env.SECRET_KEY,
      { expiresIn: '1h' })

    // console.log("token ", token)

    res.status(200).json({ msg: "successfully logged in", token })
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ msg: 'Something went wrong on the server' })
  }
}


async function getMe(req, res) {
  const { userId } = req.user
  try {
    const user = await User.findById(userId)
    if (!user) {
      // console.log("user not found")
      return res.status(401).json({ msg: "user not found" })
    }

    res.status(200).json({ newData: user })
    // console.log("user id ", user)
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ msg: error.message })
  }
}

module.exports = {
  registerUser, loginUser, getMe,
  // signupVerify, verifyOtp, updatePassword 
}