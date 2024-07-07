require('dotenv').config()

const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { Owner } = require('../models')
const auth = require('../jwt-auth')

const router = express.Router()
router.use(express.json())

// REGISTER a new owner
router.post('/new-owner', (req, res) => {
  const { name, age, password } = req.body
  bcrypt.hash(password, 10)
    .then(hashed_pass => {
      Owner.create({ name, age, password: hashed_pass })
        .then(new_owner => res.status(201).json(new_owner))
        .catch(err => res.status(400).json({ error: err }))
    })
    .catch(err => res.status(500).json({ error: err }))
})

// LOGIN
router.post('/login', (req, res) => {
  const { name, password } = req.body
  Owner.findOne({ where: { name } })
    .then(found_owner => {
      if (!found_owner) return res.status(400).json({ error: 'invalid name' })
      bcrypt.compare(password, found_owner.password)
        .then(correct => {
          if (!correct) return res.status(400).json({ error: 'invalid password' })
          jwt.sign({ id: found_owner.id }, process.env.SECRET, (err, token) => {
            return res.status(200).json({ message: 'login successfully', token })
          })
        })
        .catch(err => res.status(500).json({ error: err }))
    })
})

// GET all owner info
router.get('/owners/:token', auth, (req, res) => {
  Owner.findAll({ include: 'pets' })
    .then(owners => res.status(200).json(owners))
    .catch(err => res.status(500).json({ error: err }))
})

module.exports = router
