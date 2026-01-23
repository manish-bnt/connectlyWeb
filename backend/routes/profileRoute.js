const express = require('express')
const router = express.Router()
const middlewareAuth = require('../middleware/auth.js')
const { updateProfile, uploadProfile, deleteProfileImg, deleteAccount } = require('../controllers/profileController.js')
const upload = require('../middleware/upload.js')

router.put('/update', middlewareAuth, updateProfile)

router.delete('/delete', middlewareAuth, deleteAccount)

router.post("/upload", middlewareAuth, upload.single("profileImg"), uploadProfile)

router.delete('/delete-profile-img', middlewareAuth, deleteProfileImg)
module.exports = router