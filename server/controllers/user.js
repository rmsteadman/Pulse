const userQuery = require('../queries').userQuery;

const userController = {};

userController.signUp = (req, res) => {
  let user = req.body.user;
  userQuery.create(user);
};

module.exports = userController;
