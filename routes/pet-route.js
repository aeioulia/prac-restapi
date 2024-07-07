const express = require('express')
const auth = require('../jwt-auth')
const { Pet } = require('../models')

const router = express.Router()
router.use(express.json())

// ADD new pet
router.post('/add-a-pet/:token', auth, (req, res) => {
  const { animal, name, age, description } = req.body
  Pet.create({ animal, name, age, description, ownerId: req.user.id })
    .then(new_pet => res.status(201).json(new_pet))
    .catch(err => res.status(400).json({ error: err }))
})

// TODO: add update and delete

module.exports = router
