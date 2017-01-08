const chatroomQuery = require('../queries').chatroomQuery;

const chatroomController = {};

// logic
chatroomController.getBeaconMessages = (req, res) => {
  console.log('chtcontrol get req:', req.body);
  console.log('req.params:', req.params);
  chatroomQuery.getBeaconMessages(req.params.id)
    .then(chatroom => {
      let chat = chatroom.dataValues.chat;
      console.log('This is chat from get chat:', chat);
      console.log(typeof chat);
      res.send(chat);
    })
    .catch(err => {
      console.log('Error in chatroom controller', err);
      return err;
    });
};

chatroomController.addMessage = (req, res) => {
  console.log('req THAT body: ', req.body);
  chatroomQuery.addMessages(req.body);
};

module.exports = chatroomController;
