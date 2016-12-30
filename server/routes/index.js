const mainRouter = require('express').Router();

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

mainRouter.use('/accounts', accountRouter);
mainRouter.use('/beacons', beaconRouter);
mainRouter.use('/categories', categoryRouter);
mainRouter.use('/chatrooms', chatroomRouter);
mainRouter.use('/history', historyRouter);
mainRouter.use('/preferences', preferencesRouter);
mainRouter.use('/ratings', ratingRouter);
mainRouter.use('/requests', requestRouter);
mainRouter.use('/rsvps', rsvpRouter);
mainRouter.use('/statuses', statusRouter);
mainRouter.use('/users', userRouter);

module.exports = mainRouter;
