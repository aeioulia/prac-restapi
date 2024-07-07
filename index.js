require('dotenv').config();

const express = require('express');
const { sequelize } = require('./models');

const app = express();

const owner_route = require('./routes/owner-route')
const pet_route = require('./routes/pet-route')

app.use('/api/owner', owner_route)
app.use('/api/pet', pet_route)

sequelize.authenticate().then(() => app.listen(process.env.PORT))
