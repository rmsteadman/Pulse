const Sequelize = require('sequelize');

module.exports = (Models) => {

  const Preferences = Models.define('Preferences', {});

  return Preferences;
};
