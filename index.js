require('dotenv').config();

const express = require('express');
const { sequelize, Owner, Pet } = require('./models');

const app = express();
app.use(express.json());

app.get('/owner/:id', (req, res) => {
  const id = req.params.id;
  Owner.findByPk(id, { include: 'pets' })
    .then(found_owner => res.status(200).json(found_owner))
    .catch(err => res.status(500).send(err));
});

app.get('/pet/:id', (req, res) => {
  const id = req.params.id;
  Pet.findByPk(id, { include: 'owner' })
    .then(found_pet => res.status(200).json(found_pet))
    .catch(err => res.status(500).send(err));
});

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
