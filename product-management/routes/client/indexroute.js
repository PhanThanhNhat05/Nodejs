const productsRoute = require('./productroute');
const homeRoute = require('./homeroute');


module.exports = (app) => {
  app.use('/', homeRoute);
  app.use('/products', productsRoute);
}


