const userQuery = require('../queries').userQuery;

const userController = {};

userController.signUp = (req, res) => {
  let user = req.body.user;
  userQuery.create(user);
};

userController.POST = (req, res) => {
    console.log("req.body in user controller: ", req.body)
    userQuery.test(req.body)
}



module.exports = userController;
