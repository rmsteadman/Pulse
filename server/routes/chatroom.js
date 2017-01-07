const chatroomController = require('../controllers').chatroomController;
let chatroomRouter = require('express').Router();

// routes

chatroomRouter.put('/addmessage', chatroomController.addMessage)

module.exports = chatroomRouter;
