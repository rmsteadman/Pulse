const Sequelize = require('sequelize');

module.exports = (Models) => {

  const Beacon = Models.define('Beacon', {
    title: {
      type: Sequelize.STRING
    },
    details: {
      type: Sequelize.TEXT
    },
    tags: {
      type: Sequelize.TEXT
    },
    private: {
      type: Sequelize.BOOLEAN
    },
    icon: {
      type: Sequelize.STRING,
      validate: {
        isUrl: true
      }
    },
    address: {
      type: Sequelize.TEXT
    },
    position: {
      type: Sequelize.TEXT
    },
    start: {
      type: Sequelize.DATE
    },
    end: {
      type: Sequelize.DATE
    }
  });

  return Beacon;
};
