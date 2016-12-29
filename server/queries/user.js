const User = require('../models').User;

const userQueries = {};

// create a user (sign in)
userQueries.signUp = (user) => {
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

// sign in
// update a user
// remove a user
// verify user (two-way auth)

module.exports = userQueries;
