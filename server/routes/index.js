const Router = require('express').Router();

const accountRouter = require('./account');
const beaconRouter = require('./beacon');
const categoryRouter = require('./category');
const chatroomRouter = require('./chatroom');
const historyRouter = require('./history');
const preferencesRouter = require('./preferences');
const ratingRouter = require('./rating');
const requestRouter = require('./request');
const rsvpRouter = require('./rsvp');
const statusRouter = require('./status');
const userRouter = require('./user');

Router.use('/accounts', accountRouter);
Router.use('/beacons', beaconRouter);
Router.use('/categories', categoryRouter);
Router.use('/chatrooms', chatroomRouter);
Router.use('/history', historyRouter);
Router.use('/preferences', preferencesRouter);
Router.use('/ratings', ratingRouter);
Router.use('/requests', requestRouter);
Router.use('/rsvps', rsvpRouter);
Router.use('/statuses', statusRouter);
Router.use('/users', userRouter);

module.exports = Router;
