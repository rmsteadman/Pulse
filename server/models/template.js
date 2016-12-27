const Sequelize = require('sequelize');

module.exports = (Models) => {

  const FILL_ME_IN = Models.define('FILL_ME_IN', {
    exampleProperty: {
      type: Sequelize.INTEGER
    },
    exampleProperty2: {
      type: Sequelize.STRING
    }
  });

  return FILL_ME_IN;
};
