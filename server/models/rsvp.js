const Sequelize = require('sequelize');

module.exports = (Models) => {

  const RSVP = Models.define('RSVP', {
    details: {
      type: Sequelize.TEXT
    }
  });

  return RSVP;
};
