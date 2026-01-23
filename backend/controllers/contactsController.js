const User = require('../models/user.js')

async function addContact(req, res) {
  const { userId } = req.user
  const { name, email, address, mobile } = req.body
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $push: { contacts: { name, email, address, mobile } }
      },
      { new: true }
    )
    console.log("user ", user)
    if (!user) return res.status(401).json({ msg: 'user not found' })
    res.status(200).json({ msg: 'Contact saved', newData: user })

  } catch (error) {
    console.error(error.message)
    res.status(500).send({ msg: error.message })
  }
}


async function deleteContact(req, res) {
  try {
    const { userId } = req.user
    const { index } = req.params
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { contacts: { _id: index } } },
      { new: true }
    )

    if (!user) {
      return res.status(401).json({ msg: 'user not found!' })
    }

    res.status(200).json({ msg: 'Contact Deleted' })

  } catch (error) {
    console.error(error.message)
    res.status(500).json({ msg: error.message })
  }
}

async function updateContact(req, res) {
  try {
    const { userId } = req.user
    const { newData, id } = req.body
    const user = await User.findById(userId)
    if (!user) {
      return res.status(401).json({ msg: 'user not found' })
    }
    let updatedContact = [...user.contacts]
    updatedContact[id] = newData
    const updated = await User.findByIdAndUpdate(
      userId,
      {
        $set: { contacts: updatedContact }
      },
      { new: true }

    )
    res.status(200).json({ msg: 'updated' })

  } catch (error) {
    console.error(error.message)
    res.status(500).json({ msg: error.message })
  }

}
module.exports = { addContact, deleteContact, updateContact }