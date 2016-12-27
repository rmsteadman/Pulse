const Sequelize = require('sequelize');

module.exports = (Models) => {

  const Rating = Models.define('Rating', {
    rating: {
      type: Sequelize.INTEGER
    },
    feedback: {
      type: Sequelize.TEXT
    }
  });

  return Rating;
};
