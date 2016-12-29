const express = require('express');
const beaconController = require('../controllers/').beaconController;
let beaconRouter = express.Router();

// routes
beaconRouter.post('/create', beaconController.createBeacon);

module.exports = beaconRouter;
