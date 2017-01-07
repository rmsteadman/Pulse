const Chatroom = require('../models').Chatroom;

const chatroomQueries = {};

// create a chatroom
chatroomQueries.createChatroom = (data) => {
  return Chatroom.create({
    name: data,
    chat: '[]'
  });
};
// delete a chatroom
// find a chatroom by beacon
// clear chat

module.exports = chatroomQueries;
