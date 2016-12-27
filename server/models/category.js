const Sequelize = require('sequelize');

module.exports = (Models) => {

  const Category = Models.define('Category', {
    name: {
      type: Sequelize.STRING
    }
  });

  return Category;
};
