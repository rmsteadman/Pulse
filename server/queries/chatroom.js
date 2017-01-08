const Chatroom = require('../models').Chatroom;

const chatroomQueries = {};

// create a chatroom
chatroomQueries.createChatroom = (data) => {
  return Chatroom.create({
    name: data,
    chat: '[]'
  });
};

// add message to chatroom
chatroomQueries.addMessages = (data) => {
  console.log('THIS IS WORKING CHAT QUERY: ', data);
  let poop = data.chatroom;
  return Chatroom.find({
    where: {
      id: data.chatroom
    }
  })
    .then(result => {
      console.log('THIS IS THE RESULT IN THE QWERY: ', result);
      let chatroom = JSON.parse(result.dataValues.chat);
      chatroom.push(data);
      console.log('this is the chatroom: ', chatroom);
      Chatroom.update({
        chat: JSON.stringify(chatroom)
      },
        {
          where: {
            id: poop
          }
        });
    });
};

// find a chatroom by beacon
chatroomQueries.getBeaconMessages = (data) => {
  return Chatroom.find({
    where: {
      id: data
    }
  });
};
// delete a chatroom
// clear chat

module.exports = chatroomQueries;
