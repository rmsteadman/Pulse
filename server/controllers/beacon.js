const beaconQuery = require('../queries').beaconQuery;

const beaconController = {};

beaconController.createBeacon = (req, res) => {
  beaconQuery.createBeacon(req.body)
    .then(beacon => {
      console.log('Beacon created :', beacon);
      res.send(beacon);
    })
    .catch(err => {
      console.log('Error creating beacon:', err);
      return err;
    });
};

// more logic

module.exports = beaconController;
