const User = require('../models/user.js')
async function updateProfile(req, res) {
  try {
    const { userId } = req.user
    const { username, email } = req.body
    console.log(username, email)
    let updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { username, email } },
      { new: true }
    )
    console.log("updated ", updatedUser)
    res.status(200).json({ msg: 'successfully updated', newData: updatedUser })

  } catch (error) {
    res.status(500).json({ msg: 'something went wrong' })
  }
}

async function deleteAccount(req, res) {
  try {
    const { userId } = req.user
    const { email } = req.body
    console.log("email delete ", email)
    console.log("userid delete ", userId)
    const user = await User.findById(userId)
    console.log("userdelete ", user)
    if (!user) {
      return res.status(401).json({ msg: 'user not found' })
    }
    if (user.email !== email) {
      return res.status(401).json({ msg: 'Incorrect email' })
    }
    await User.findByIdAndDelete(userId)
    res.status(200).json({ msg: 'Account deleted successfully' })
  } catch (error) {
    console.error(error.message)
    res.status(500).json('invalid token user not found!')
  }
}

async function uploadProfile(req, res) {
  try {
    const { userId } = req.user
    if (!req.file) {
      return res.status(400).json({ msg: "File not uploaded" })
    }
    console.log("filename ", req.file)
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          profile: `https://connectlyweb.onrender.com/uploads/${req.file.filename}`
        }
      },
      { new: true }
    )

    res.status(200).json({ msg: "Image uploaded successfully", newData: user })

  } catch (error) {
    console.error(error.message)
    res.status(500).json({ msg: error.message })
  }
}


async function deleteProfileImg(req, res) {
  try {
    const { userId } = req.user
    let user = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          profile: ""
        }
      },
      { new: true }
    )
    if (!user) {
      return res.status(401).json({ msg: 'user not found!' })
    }

    res.status(200).json({ msg: 'Profile deleted' })

  } catch (error) {
    console.error(error.message)
    res.status(500).json({ msg: error.message })
  }
}

module.exports = { updateProfile, deleteAccount, uploadProfile, deleteProfileImg }