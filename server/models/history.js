const Sequelize = require('sequelize');

module.exports = (Models) => {

  const History = Models.define('History', {
    beaconId: {
      type: Sequelize.INTEGER
    },
    data: {
      type: Sequelize.TEXT
    }
  });

  return History;
};
