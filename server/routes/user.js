const userController = require('../controllers').userController;
const userQuery = require('../queries').userQuery;
let userRouter = require('express').Router();

// routes
// userRouter.get('/allusers', userController.getAllUsers)
userRouter.post('/signup', userController.signUp);
userRouter.put('/prefs', userController.savePrefs);

module.exports = userRouter;
