const Category = require('../models').Category;

const categoryQueries = {};

// find a category
categoryQueries.findCategory = (data) => {
  return Category.find({
    where: {
      name: data
    }
  });
};
// add a category
// remove a category
// update a category

module.exports = categoryQueries;
