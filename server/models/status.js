const Sequelize = require('sequelize');

module.exports = (Models) => {

  const Status = Models.define('Status', {
    type: {
      type: Sequelize.STRING
    }
  });

  return Status;
};
