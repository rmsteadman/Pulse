const Sequelize = require('sequelize');

module.exports = (Models) => {

  const User = Models.define('User', {
    accountId: {
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING
    },
    photo: {
      type: Sequelize.TEXT,
      validate: {
        isUrl: true
      }
    },
    authCred: {
      type: Sequelize.TEXT
    },
    authToken: {
      type: Sequelize.TEXT
    },
    verified: {
      type: Sequelize.BOOLEAN
    }
  }, {
    /**
     * freezeTableName: Model tableName will be the same as the model name
     *  */
    freezeTableName: true,
    classMethods: {
      associate: (models) => {
        User.hasMany(__INSERTHERE_);
      }
    }
  });

  return User;
};
