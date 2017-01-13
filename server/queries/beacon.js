const Beacon = require('../models').Beacon;
const Category = require('../models').Category;
const Rating = require('../models').Rating;
const Status = require('../models').Status;
const User = require('../models').User;

const beaconQueries = {};

// create a beacon
beaconQueries.createBeacon = (data) => {
  console.log("DATA DATA DATA", data)
  return Beacon.create(data)
    .then(data => {
      return data;
    })
    .catch(err => {
      console.log('Error in Beacon Query file');
      return err;
    });
// return Beacon.create({
//   status: 1,
//   title: data.title,
//   details: data.details,
//   tags: data.tags,
//   private: false,
//   icon: data.icon || 'http://airnativeextensions.com/images/extensions/icons/ane-beacon-icon.png',
//   position: '{"lat":33.976224,"lng":-118.390848}',
//   start: Date.now(),
//   end: Date.now() + 86400000
// })
};

// get all beacons
beaconQueries.getAllBeacons = () => {
  return Beacon.findAll({
    include: [{ all: true }]
  });
};
// update a beacon
// delete a beacon
// set a beacon start/end date
// change beacon tags
// make/unmake private
// update icon

beaconQueries.findAllBeacons = () => {
  return Beacon.findAll({})
    .then(beacons => {
      return beacons;
    });
};

beaconQueries.findBeaconsByUser = (userId) => {
  return User.find({
    where: {
      id: userId
    }
  })
    .then(user => {
      return user.getBeacons()
        .then(beacons => {
          return beacons;
        });
    });
};

beaconQueries.deleteBeacon = (beaconId) => {
  return Beacon.destroy({
    where: {
      id: beaconId
    }
  })
}


module.exports = beaconQueries;
