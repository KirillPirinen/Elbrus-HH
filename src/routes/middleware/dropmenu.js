const {Location} = require('../../../db/models');

const dropmenu = ('/', async (req, res, next) => {
  res.locals.dropmenu = await Location.findAll();
  next();
});

module.exports = dropmenu;
