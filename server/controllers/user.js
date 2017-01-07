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

// get prefs
userController.getPrefs = (req, res) => {
  // console.log('This is getPres reqparams:', req.params)
  let authCred = req.params.userId;
  userQuery.getPrefs(authCred)
    .then(user => {
      let prefs = user.dataValues.prefs;
      // console.log('This is prefs from get prefs:', user)
      res.send(prefs);
    })
    .catch(err => {
      console.log('Error in user controller, (get all prefs)', err);
      return err;
    });
};

// add/update prefs
userController.savePrefs = (req, res) => {
  let prefs = req.body;
  console.log('save pref controller prefs:', prefs);
  userQuery.savePrefs(prefs)
    .then((user) => {
      user.prefs = prefs.updatedList;
      user.save();
      res.json(user);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports = userController;
