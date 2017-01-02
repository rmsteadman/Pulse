const userQuery = require('../queries').userQuery;

const userController = {};

// logic

userController.POST = (req, res) => {
    
    console.log("req.body in user controller: ", req.body)
    // userQuery.signUp(req.body)
}



module.exports = userController;
