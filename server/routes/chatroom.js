const chatroomController = require('../controllers').chatroomController;
let chatroomRouter = require('express').Router();

// routes

chatroomRouter.post('/addmessage', chatroomController.addMessage)

module.exports = chatroomRouter;
