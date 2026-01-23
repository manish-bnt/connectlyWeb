const express = require('express')
const router = express.Router()
const middlewareAuth = require('../middleware/auth.js')
const { registerUser, loginUser, getMe, verifyOtp, updatePassword, signupVerify } = require('../controllers/authController.js')
const { requestOtp } = require('../controllers/emailController.js')

router.post('/signup', registerUser)
router.post('/signin', loginUser)
// router.post('/request-otp', requestOtp)
// router.post('/signup-verify', signupVerify)
// router.post('/verify-otp', verifyOtp)
// router.put('/new-password', updatePassword)
router.get('/me-profile', middlewareAuth, getMe)

module.exports = router