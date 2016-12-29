const Account = require('../models').Account;
const User = require('../models').User;

const accountQueries = {};

// get account type
accountQueries.getAccountType = (userId) => {
  return User.findOne({
    where: {
      userId: userId
    }
  })
    .then((user) => {
      return Account.find({
        where: {
          id: user.accountId
        }
      });
    });
};

module.exports = accountQueries;
