const userController = require('../controllers').userController;
const userQuery = require('../queries').userQuery
let userRouter = require('express').Router();

// routes

userRouter.post('/signup', userController.POST)

module.exports = userRouter;
