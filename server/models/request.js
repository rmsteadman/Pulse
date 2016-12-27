const Sequelize = require('sequelize');

module.exports = (Models) => {

  const Request = Models.define('Request', {
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.TEXT
    },
    votes: {
      type: Sequelize.TEXT
    }
  });

  return Request;
};
