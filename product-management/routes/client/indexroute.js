const productsRoute = require('./productroute');
const homeRoute = require('./homeroute');
const debugRoute = require('./debugroute');


module.exports = (app) => {
  app.use('/', homeRoute);
  app.use('/products', productsRoute);
  app.use('/', debugRoute);
}


