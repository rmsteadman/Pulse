const userController = require('../controllers').userController;
const userQuery = require('../queries').userQuery;
let userRouter = require('express').Router();

// routes
// userRouter.get('/allusers', userController.getAllUsers)
userRouter.post('/login', userController.login);
userRouter.post('/signup', userController.signUp);
userRouter.get('/getprefs/:userId', userController.getPrefs);
userRouter.put('/saveprefs', userController.savePrefs);
userRouter.get('/gettoken', userController.getToken);
userRouter.get('/finduser', userController.findUser);

module.exports = userRouter;
