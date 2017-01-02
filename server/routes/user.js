const userController = require('../controllers').userController;
let userRouter = require('express').Router();

// routes
userRouter.get('/allusers', userController.getAllUsers);
userRouter.post('/signup', userController.signUp);

module.exports = userRouter;
