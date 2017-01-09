const RSVP = require('../models').RSVP;

const rsvpQuery = {};

// create an RSVP
rsvpQuery.create = (rsvpData) => {
    return RSVP.create(rsvpData)
    .then(data => {
    return data;
    })
    .catch(err => {
    console.log('Error in RSVP Query file');
      return err;
    });
}
// delete an RSVP
// update an RSVP details
// find RSVPs by beacon

module.exports = rsvpQuery;
