const mongoose = require('mongoose')

const pendingUserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },

  password: {
    type: String,
    required: true
  },

  profile: {
    type: String,
    default: ""
  },

  expiresAt: {
    type: Date,
    default: () => Date.now() + 5 * 60 * 1000
  }
})


// TTL index (auto delete)
pendingUserSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

module.exports = mongoose.model('Pendinguser', pendingUserSchema)