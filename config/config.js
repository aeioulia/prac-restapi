require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.PASS,
    "database": process.env.DB_NAME,
    "host": process.env.HOST,
    "dialect": "mysql"
  }
}
