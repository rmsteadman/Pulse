const chatroomController = require('../controllers').chatroomController;
let chatroomRouter = require('express').Router();

// routes
chatroomRouter.get('/getmessages/:id', chatroomController.getBeaconMessages);
chatroomRouter.put('/addmessage', chatroomController.addMessage);

module.exports = chatroomRouter;
