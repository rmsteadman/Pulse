const Sequelize = require('sequelize');
// const Models = new Sequelize(`postgres://${process.env.AWS_USER}:${process.env.AWS_PASSWORD}@pulse.co49asid5dqy.us-west-1.rds.amazonaws.com:5432/${process.env.AWS_DB}`)
require('dotenv').config()
const Models = new Sequelize(process.env.EL_URL);

Models.authenticate()
  .then(() => {
    console.log('Connection successful.');
  })
  .catch(err => {
    console.log('Unable to connect to the database:', err);
  });

module.exports = Models;
