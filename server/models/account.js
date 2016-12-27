const Sequelize = require('sequelize');

module.exports = (Models) => {

  const Account = Models.define('Account', {
    type: {
      type: Sequelize.STRING
    }
  });

  return Account;
};
