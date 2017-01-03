const Sequelize = require('sequelize');

module.exports = (Models) => {

  const Preferences = Models.define('Preferences', {
    preferences: {
      type: Sequelize.TEXT
    },
    photo: {
      type: Sequelize.TEXT
    }
  });

  return Preferences;
};
