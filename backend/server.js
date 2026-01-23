const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const app = express()
const path = require('path')
const cors = require('cors')
let PORT = process.env.PORT || 5001
app.use(cors({
  origin: [
    "https://connectly-web.netlify.app",
    "http://localhost:5173",
    "http://192.168.29.7:5173"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}))
app.use(express.json())
app.use('/', require("./routes/router.js"))
app.use('/auth', require("./routes/authRoutes.js"))
app.use('/profile', require("./routes/profileRoute.js"))
app.use('/contact', require('./routes/contactsRoute.js'))
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

mongoose.connect(process.env.DB_URL)
  .then(() => {
    console.log("Database connected")
    app.listen(PORT, () => console.log(`server is running... https://localhost:${PORT}`))
  })
  .catch(err => console.error(err.message))






