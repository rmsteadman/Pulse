const Chatroom = require('../models').Chatroom;

const chatroomQueries = {};

// create a chatroom
chatroomQueries.createChatroom = (data) => {
  return Chatroom.create({
    name: data,
    chat: '[]'
  });
};
//add message to chatroom
chatroomQueries.addMessages = data => {
  Chatroom.update({
    chat: chat + data
  },
    {
      where: {
        name: user.chatroomId
      }
    });
}

// delete a chatroom
// find a chatroom by beacon
// clear chat


module.exports = chatroomQueries;
