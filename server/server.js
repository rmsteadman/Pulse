const express = require('express');
const app = express();
require('../.env');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const models = require('./models');
const cors = require('cors');
const mainRouter = require('./routes');
const path = require('path');
const PORT = process.env.PORT || 8080;

const server = require('http').createServer(app);
const io = require('socket.io')(server);
// //
io.on('connection', (socket) => {
  console.log('User Connected');

  socket.on('disconnect', (data) => {
    console.log('User disconnected');
  });

  socket.on('message', (data) => {
    io.sockets.emit('message', data);
  });

  socket.on('beacon', (data) => {
    io.sockets.emit('beacon', data);
  });

  socket.on('newRsvp', (data) => {
    console.log('THERES AN RSVP::: ', data);
    io.sockets.emit('newRsvp', data);
  });
});

app.set('port', PORT);
app.set('json spaces', 2);

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// establish tables, type 'true' inside brackets to drop tables
models.Sync();

// serve static files
app.use('/', express.static(path.join(__dirname, '../www')));

// establish routes
app.use('/api', mainRouter);

// app.get('*', function (req, res) {
//   res.sendFile(path.resolve(__dirname, '../src', 'index.html'))
// })
server.listen(app.get('port'), () => console.log(`Server and sockets listening on port ${app.get('port')}`));
