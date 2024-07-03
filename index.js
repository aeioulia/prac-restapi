require('dotenv').config();

const express = require('express');
const { sequelize } = require('./models');

const app = express();

sequelize.authenticate().then(() => app.listen(process.env.PORT));
