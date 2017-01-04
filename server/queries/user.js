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
      firstName: user.firstName,
      lastName: user.lastName,
      password: user.password,
      phoneNumber: user.phoneNumber

    }
  })
    .spread((newUser, created) => {
      if (created) {
        return {
          'success': true,
          'message': 'User successfully created!',
          'userId': newUser.id
        };
      }
      return {
        'success': false,
        'message': 'User already exists.'
      };
    });
};

// get all users
userQueries.getAllUsers = () => {
  return User.findAll({
    include: [{ all: true }]
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
