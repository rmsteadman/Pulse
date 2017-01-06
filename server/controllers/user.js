const userQuery = require('../queries').userQuery;

const userController = {};

// sign up
userController.signUp = (req, res) => {
  console.log('uCon reqbody', req.body);
  let user = req.body;
  userQuery.create(user)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.json(err);
    });
};

// find user
userController.findUser = (req, res) => {
  let token = req.body;
  userQuery.findUser(token)
    .then(user => {
      (user) ? res.json(user) : res.json({});
    })
    .catch((err) => {
      res.json(err);
    });
};

// get token
userController.getToken = (req, res) => {
  console.log('getToken reqbody', req.body);
  let token = req.body;
  userQuery.getToken()
    .then(token => {
      (token) ? res.json(token) : res.json({});
    })
    .catch((err) => {
      res.json(err);
    });
};

// find a user
userController.login = (req, res) => {
  userQuery.findUser()
    .then(user => {
      (user) ? res.json(user) : res.json({});
    })
    .catch((err) => {
      res.json(err);
    });
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
