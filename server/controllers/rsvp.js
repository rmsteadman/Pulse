const rsvpQuery = require('../queries').rsvpQuery;
const userQuery = require('../queries').userQuery;
const rsvpController = {};

// logic

rsvpController.create = (req, res) => {
    console.log("GOT INTO CONTROLLOER", req.body)
    let rsvp = {
        UserId: null,
        BeaconId: req.body.id,
        details: req.body.details
    };
    userQuery.findUser(req.body.token)
    .then(results => {
        rsvp.UserId = results.id
        return rsvpQuery.create(rsvp);
    })
    
}


module.exports = rsvpController;
