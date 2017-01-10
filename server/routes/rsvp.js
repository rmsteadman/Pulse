const rsvpController = require('../controllers').rsvpController;
let rsvpRouter = require('express').Router();

// routes

rsvpRouter.post('/create', rsvpController.create);
rsvpRouter.get('/getall/:id', rsvpController.getByBeacon);

module.exports = rsvpRouter;
