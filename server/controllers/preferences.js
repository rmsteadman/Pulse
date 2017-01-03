const preferencesQuery = require('../queries').preferencesQuery;

const preferencesController = {};

preferencesController.savePreferences = (req, res) => {
    console.log("req.body is here: ", req.body)
}

module.exports = preferencesController;
