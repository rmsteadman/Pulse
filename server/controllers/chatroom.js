const chatroomQuery = require('../queries').chatroomQuery;

const chatroomController = {};

// logic

chatroomController.addMessage = (req, res) => {
    console.log('req THAT body: ', req.body)
    chatroomQuery
}

module.exports = chatroomController;
