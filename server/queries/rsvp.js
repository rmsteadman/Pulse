const RSVP = require('../models').RSVP;
const User = require('../models').User;
const rsvpQueries = {};

// create an RSVP
rsvpQueries.create = (rsvpData) => {
  return RSVP.create(rsvpData)
    .then(data => {
      return data;
    })
    .catch(err => {
      console.log('Error in RSVP Query file');
      return err;
    });
};

// delete an RSVP
// update an RSVP details

// find RSVPs by beacon
rsvpQueries.findRSVPs = (data) => {
  // console.log('data in findRSVP:', data)
  return RSVP.findAll({
    include: [
      { model: User, required: true}
    ],
    where: {
      BeaconId: data
    }
  });
};

module.exports = rsvpQueries;
