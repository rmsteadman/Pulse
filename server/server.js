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

app.use('/', express.static(path.join(__dirname, '../src')))
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
