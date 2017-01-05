const beaconQuery = require('../queries').beaconQuery;

const beaconController = {};

beaconController.createBeacon = (req, res) => {
  beaconQuery.createBeacon(req.body)
    .then(beacon => {
      // console.log('Beacon created :', beacon)
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
