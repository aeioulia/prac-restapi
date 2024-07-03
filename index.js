require('dotenv').config();

const express = require('express');
const { sequelize, Owner, Pet } = require('./models');

const app = express();
app.use(express.json());

app.post('/create-owner', (req, res) => {
  const { name, age } = req.body;
  Owner.create({ name, age })
    .then(new_owner => res.status(201).json(new_owner))
    .catch(err => res.status(500).send(err));
});

app.post('/add-a-pet/:ownerId', (req, res) => {
  const ownerId = req.params.ownerId;
  const { animal, name, age, description } = req.body;
  Pet.create({ animal, name, age, description, ownerId })
    .then(new_pet => res.status(201).json(new_pet))
    .catch(err => res.status(500).send(err));
});

sequelize.authenticate().then(() => app.listen(process.env.PORT));
