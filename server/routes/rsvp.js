const rsvpController = require('../controllers').rsvpController;
let rsvpRouter = require('express').Router();

// routes

rsvpRouter.post('/create', rsvpController.create)

module.exports = rsvpRouter;
