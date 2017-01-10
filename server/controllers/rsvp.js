const rsvpQuery = require('../queries').rsvpQuery;
const userQuery = require('../queries').userQuery;
const rsvpController = {};

// make an rsvp
rsvpController.create = (req, res) => {
  console.log('GOT INTO CONTROLLOER', req.body);
  let rsvp = {
    UserId: null,
    BeaconId: req.body.id,
    details: req.body.details
  };
  userQuery.findUser(req.body.token)
    .then(results => {
      rsvp.UserId = results.id;
      return rsvpQuery.create(rsvp);
    });
};

// get rsvps by beacon
rsvpController.getByBeacon = (req, res) => {
  // console.log('this is req', req.params)
  let id = req.params.id;
  rsvpQuery.findRSVPs(id)
    .then(results => {
      // console.log('rsvp results', results)
      (results) ? res.send(results) : res.send({});
    })
    .catch(err => {
      console.log('Error in rsvp controller, (getByBeacon)', err);
      return err;
    });
};

module.exports = rsvpController;
