const systemConfig = require('../../config/system');
const dashboardRoute  = require('./dashboardroute');
const productRoute = require('./productRouter');

module.exports = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin;
  app.use(`${PATH_ADMIN}/dashboard`, dashboardRoute);
  app.use(`${PATH_ADMIN}/products`, productRoute);

}


