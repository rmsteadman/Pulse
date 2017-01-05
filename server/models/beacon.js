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
    position: {
      type: Sequelize.TEXT
    },
    start: {
      type: Sequelize.DATE
    },
    end: {
      type: Sequelize.DATE
    },
    category: {
      type: Sequelize.STRING
    }
  });

  return Beacon;
};
