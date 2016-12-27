const express = require('express');
require('dotenv').config({path: '../.env'});
const morgan = require('morgan');
const bodyParser = require('body-parser');
const router = require('./routes');
const cors = require('cors');
const path = require('path');
const PORT = process.env.PORT || 8080;
const app = express();

// const Models = require('./models')

app.set('port', PORT);
app.set('json spaces', 2);

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// establish tables
require('./models').Sync();

// const Sequelize = require('sequelize')

// import all models
// ex. const User = require('./user.model.js')(Models)
// const Account = require('./models/account.model.js')(Models)
// const Beacon = require('./models/beacon.model.js')(Models)
// const Category = require('./models/category.model.js')(Models)
// const Chatroom = require('./models/chatroom.model.js')(Models)
// const History = require('./models/history.model.js')(Models)
// const Preferences = require('./models/preferences.model.js')(Models)
// const Rating = require('./models/rating.model.js')(Models)
// const Request = require('./models/request.model.js')(Models)
// const RSVP = require('./models/rsvp.model.js')(Models)
// const Status = require('./models/status.model.js')(Models)
// const User = require('./models/user.model.js')(Models)

// define any extra models

// Define db relations here

// helper to drop tables (force:true)
// Models.sync({ force: true }).then(function () {
//   console.log('Successfully dropped tables.')
// })

// sync all files

// Models.sync().then(() => {
//   console.log('Successfully initialized tables.')
// })

// app.use('/', express.static(path.join(__dirname, '../client')))
app.get('/', function (req, res) {
  res.send('We have contact.');
});

// Handle known routes
// app.use('/api', router)

// Display error 404 for unknown routes
app.use(function (req, res) {
  res.send('Error 404: Page not found');
});

app.get('*', function (req, res) {
  // res.sendFile(path.resolve(__dirname, ))
});

app.listen(app.get('port'), function () {
  console.log(`Server is listening on port ${app.get('port')}`);
});
