const beaconQuery = require('../queries').beaconQuery;
const categoryQuery = require('../queries').categoryQuery;
const chatroomQuery = require('../queries').chatroomQuery;
const userQuery = require('../queries').userQuery;
const request = require('request');
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

  if (config.address){
    let location = config.address;
    request.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + location + '&key=AIzaSyCLyU4KWsPF_hzaJeEADv3zrtGdsQDYAvc',(error, response, body) => {
      if (error) {
        console.log(`There has been a grave error: ${error}`)
      }
      let coordinates = JSON.parse(body)
      let latLong = coordinates.results[0].geometry.location;
      console.log("CONFIG BABY!!! ", JSON.stringify(config.address));
      config.position = JSON.stringify(latLong);
      
    })
  }

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
      // console.log('Chatroom after findCat: ', chatroom.dataValues);
      // console.log('chatroom.dataValues.id:', chatroom.dataValues.id);
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

beaconController.getMyBeacons = (req, res) => {
  console.log('Thi is sis params: ', req.params.userId)
  let userId = req.params.userId;

  userQuery.findUser(userId)
    .then(user => {
      beaconQuery.findBeaconsByUser(user.id)
        .then(beacons => {
          res.send(beacons)
        })
        .catch(err => {
          console.log('There has been an error in the get my beacons: ', err)
        })
    })
}


beaconController.deleteBeacon = (req, res) => {
  console.log("REQ DAAA BODYYYYYYY")
}





// more logic

module.exports = beaconController;
