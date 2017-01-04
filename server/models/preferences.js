const Sequelize = require('sequelize');

module.exports = (Models) => {

  const Preferences = Models.define('Preferences', {
    prefs: {
      type: Sequelize.TEXT
    }
  });

  return Preferences;
};
