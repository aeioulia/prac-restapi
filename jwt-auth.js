require('dotenv').config()

const jwt = require('jsonwebtoken')
const { Owner } = require('./models')

module.exports = (req, res, next) => {
  const token = req.params.token
  if (!token) return res.status(401).json({ message: 'invalid token' })
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    Owner.findOne({ where: { id: decoded.id } })
      .then(found_owner => {
        if (!found_owner) return res.status(401).json({ message: 'invalid token' })
        req.user = found_owner.dataValues
        next()
      })
      .catch(err => res.status(500).json({ error: err }))
  })
}
