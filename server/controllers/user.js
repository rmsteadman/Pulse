const userQuery = require('../queries').userQuery;

const userController = {};

// sign up
userController.signUp = (req, res) => {
  let user = req.body.user;
  userQuery.create(user);
};

// post
userController.POST = (req, res) => {
  console.log('req.body in user controller: ', req.body);
  userQuery.test(req.body);
};

// add/update prefs
userController.savePrefs = (req, res) => {
  let prefs = req.body.prefs;
  userQuery.savePrefs(prefs);
};

module.exports = userController;
