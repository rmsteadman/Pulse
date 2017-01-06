const Sequelize = require('sequelize');

module.exports = (Models) => {

  const User = Models.define('User', {
    accountId: {
      type: Sequelize.INTEGER
    },
    email: {
      type: Sequelize.STRING
    },
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    phoneNumber: {
      type: Sequelize.STRING
    },
    photo: {
      type: Sequelize.TEXT,
      validate: {
        isUrl: true
      }
    },
    authCred: {
      type: Sequelize.TEXT
    },
    authToken: {
      type: Sequelize.TEXT
    },
    verified: {
      type: Sequelize.BOOLEAN
    },
    prefs: {
      type: Sequelize.TEXT
    }
  });

  return User;
};
