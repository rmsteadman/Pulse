const userController = require('../controllers').userController;
const userQuery = require('../queries').userQuery;
let userRouter = require('express').Router();

// routes
// userRouter.get('/allusers', userController.getAllUsers)
userRouter.post('/login', userController.login);
userRouter.post('/signup', userController.signUp);
userRouter.put('/prefs', userController.savePrefs);
userRouter.get('/gettoken', userController.getToken);

module.exports = userRouter;
