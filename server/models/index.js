const Models = require('./config');
const Sequelize = require('sequelize');

// import all models
// ex. const User = require('./user.model.js')(Models)
const Account = require('./account')(Models);
const Beacon = require('./beacon')(Models);
const Category = require('./category')(Models);
const Chatroom = require('./chatroom')(Models);
const History = require('./history')(Models);
const Preferences = require('./preferences')(Models);
const Rating = require('./rating')(Models);
const Request = require('./request')(Models);
const RSVP = require('./rsvp')(Models);
const Status = require('./status')(Models);
const User = require('./user')(Models);

// define any extra models

// Define db relations here

// helper to drop tables (force:true)
// const Sync = function () {
//   return Models.sync({ force: true }).then(function () {
//     console.log('Successfully dropped tables.')
//   })
// }

// sync all files
const Sync = function () {
  Models.sync().then(() => {
    console.log('Successfully initialized tables.');
  });
};

module.exports = {
  Account: Account,
  Beacon: Beacon,
  Category: Category,
  Chatroom: Chatroom,
  History: History,
  Preferences: Preferences,
  Rating: Rating,
  Request: Request,
  RSVP: RSVP,
  Status: Status,
  User: User,
  Models: Models,
  Sync: Sync
};
