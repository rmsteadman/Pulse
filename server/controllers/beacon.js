const beaconQuery = require('../queries').beaconQuery;
const categoryQuery = require('../queries').categoryQuery;
const chatroomQuery = require('../queries').chatroomQuery;
const userQuery = require('../queries').userQuery;

const beaconController = {};

beaconController.createBeacon = (req, res) => {
  // gather data to create beacon
  // console.log('This is req.body', req.body)

  let config = req.body;
  let categoryType = config.categoryType;
  let authCred = config.authCred;
  let chatRoomName = config.title;

  config.UserId = null,
  config.CategoryId = null;
  config.ChatroomId = null;
  // console.log('This is config', config)

  // find User FOR UserId
  userQuery.findUser(authCred)
    .then(user => {
      console.log('User after findUser: ', user.dataValues);
      console.log('user.dataValues.id:', user.dataValues.id);
      config.UserId = user.dataValues.id;
      // find Category FOR CategoryId
      return categoryQuery.findCategory(categoryType);
    })
    .then(category => {
      console.log('Category after findCat: ', category.dataValues);
      console.log('category.dataValues.id:', category.dataValues.id);
      config.CategoryId = category.dataValues.id;
      // create Chatroom FOR ChatroomId
      return chatroomQuery.createChatroom(chatRoomName);
    })
    .then(chatroom => {
      console.log('Chatroom after findCat: ', chatroom.dataValues);
      console.log('chatroom.dataValues.id:', chatroom.dataValues.id);
      config.ChatroomId = chatroom.dataValues.id;
      console.log('Config after chat query:', config);
      // create Beacon with updated config
      return beaconQuery.createBeacon(config);
    })
    .then(beacon => {
      console.log('Beacon created :', beacon.dataValues);
      res.send(beacon);
    })
    .catch(err => {
      console.log('Error creating beacon:', err);
      return err;
    });
};

beaconController.getAllBeacons = (req, res) => {
  beaconQuery.getAllBeacons()
    .then(beacons => {
      // console.log("GETTING ALL THE DAMN BACONS IN THE SHOP!", beacons)
      res.send(beacons);
    })
    .catch(err => {
      console.log('Error in beacon controller, (get all beacons)', err);
      return err;
    });
};

// more logic

module.exports = beaconController;
