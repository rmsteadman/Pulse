const express = require('express');
require('dotenv').config({path: '../.env'});
const morgan = require('morgan');
const bodyParser = require('body-parser');
const router = require('./routes');
const cors = require('cors');
const path = require('path');
const PORT = process.env.PORT || 8080;
const app = express();

app.set('port', PORT);
app.set('json spaces', 2);

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// establish tables, type 'true' inside brackets to drop tables
require('./models').Sync();

// serve static files
app.use('/', express.static(path.join(__dirname, '../src')));

// establish routes
app.use('/api', router);

app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../src', 'index.html'));
});

app.listen(app.get('port'), function () {
  console.log(`Server is listening on port ${app.get('port')}`);
});
