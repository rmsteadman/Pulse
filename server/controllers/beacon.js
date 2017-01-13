const beaconQuery = require('../queries').beaconQuery;
const categoryQuery = require('../queries').categoryQuery;
const chatroomQuery = require('../queries').chatroomQuery;
const userQuery = require('../queries').userQuery;
const request = require('request-promise');
const beaconController = {};

beaconController.createBeacon = (req, res) => {
  // gather data to create beacon
  let config = req.body;
  let categoryType = config.categoryType;
  let authCred = config.authCred;
  let chatRoomName = config.title;

  config.UserId = null,
  config.CategoryId = null;
  config.ChatroomId = null;

  if (config.usingCurrentLocation == false && config.position === ''){
    let location = config.address;
    request.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + location + '&key=AIzaSyCLyU4KWsPF_hzaJeEADv3zrtGdsQDYAvc', (error, response, body) => {
      if (error) {
        res.status(500).send(error)
      }
      let coordinates = JSON.parse(body);
      let latLong = coordinates.results[0].geometry.location;
      config.position = JSON.stringify(latLong);
    })
    .then(coordinates => {
      // find User FOR UserId
      return userQuery.findUser(authCred)
        .then(user => {
          
          config.UserId = user.id;
          console.log("MIKE IS GONNA WIN 0-----------------", categoryType)
          // find Category FOR CategoryId
          return categoryQuery.findCategory(categoryType)
            .then(category => {
              config.CategoryId = category.id;
              // create Chatroom FOR ChatroomId
              return chatroomQuery.createChatroom(chatRoomName)
                .then(chatroom => {
                  config.ChatroomId = chatroom.dataValues.id;

                  // create Beacon with updated config
                  return beaconQuery.createBeacon(config)
                    .then(beacon => {
                      res.send(beacon)
                    })
                })
            })
        })
        .catch(err => {
          console.log('Error creating beacon:', err);
          return err;
        });
    })
  }

};

beaconController.getAllBeacons = (req, res) => {
  beaconQuery.getAllBeacons()
    .then(beacons => {
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
  console.log("REQ DAAA BODYYYYYYY: ", req.params.beaconId)
  let beaconId = req.params.beaconId;
  beaconQuery.deleteBeacon(beaconId)
    .then(data => {
      console.log("HERES SOME DATA BWEH: ", data)
    })
    .catch(err => {
      console.log("Error in beacon deletion promise: ", err)
    })
}


// more logic

module.exports = beaconController;
