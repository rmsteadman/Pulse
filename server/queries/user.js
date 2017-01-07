const User = require('../models').User;

const userQueries = {};

// dev test
userQueries.test = (data) => {
  console.log('data bweh: ', data);
};

// create a user (sign in)
userQueries.create = (user) => {
  return User.findOrCreate({
    where: {
      email: user.email
    },
    defaults: {
      accountId: 1,
      authCred: user.authCred,
      authToken: user.authToken,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      photo: user.photo || 'http://www.ebl-law.com/wp-content/uploads/2016/05/default-profile.png',
      verified: false,
      prefs: `[1, 1, 1, 1, 1, 1, 1, 1, 1]`
    // `[
    //   { "preference": "Active", "icon": "walk", "checked": true },
    //   { "preference": "Learn", "icon": "school", "checked": true },
    //   { "preference": "Community", "icon": "people", "checked": true },
    //   { "preference": "Eat/Drink", "icon": "pizza", "checked": true },
    //   { "preference": "Music", "icon": "musical-notes", "checked": true },
    //   { "preference": "Travel", "icon": "globe", "checked": true },
    //   { "preference": "Art", "icon": "image", "checked": true },
    //   { "preference": "Games", "icon": "game-controller-a", "checked": true },
    //   { "preference": "Featured", "icon": "star", "checked": true }
    // ]`
    }
  });
};

// fetch user token
userQueries.getToken = () => {
  models.User.find({
    where: {
      authCred: req.body.auth
    }
  });
};

// get all users
userQueries.getAllUsers = () => {
  return User.findAll({
    include: [{ all: true }]
  });
};

// find a user
userQueries.findUser = (data) => {
  return User.find({
    where: {
      authCred: data
    }
  });
};

// sign in
// update a user
// remove a user
// verify user (two-way auth)

// add/update prefs
userQueries.savePrefs = (prefs) => {
  User.update({
    prefs: prefs
  },
    {
      where: {
        email: user.email
      }
    });
};

module.exports = userQueries;
