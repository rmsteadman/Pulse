const Sequelize = require('sequelize');

module.exports = (Models) => {

  const Chatroom = Models.define('Chatroom', {
    name: {
      type: Sequelize.STRING
    },
    chat: {
      type: Sequelize.TEXT
    }
  });

  return Chatroom;
};
