const Chatroom = require('../models').Chatroom;

const chatroomQueries = {};

// create a chatroom
userQueries.create = (data) => {
  return Chatroom.create({
    name: data.name,
    chat: '[]'
  });
};
// delete a chatroom
// find a chatroom by beacon
// clear chat

module.exports = chatroomQueries;
