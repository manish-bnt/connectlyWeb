const express = require('express')
const router = express.Router()
const fs = require('fs')
const { existsSync } = require('fs')

const uploadDir = "uploads";
if (!existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir)
}

router.get('/', (req, res) => {
  res.send(JSON.stringify({ msg: "server is running" }))
})

module.exports = router