const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
  const header = req.headers.authorization
  if (!header) {
    // console.log("token ", header)
    return res.status(401).json({ msg: 'No token provided' })
  }

  const token = header.split(' ')[1]
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    req.user = decoded
    console.log("req.user ", decoded)
    next()
  } catch (error) {
    return res.status(401).json({ msg: 'token expired' })
  }

}

module.exports = auth
