const systemConfig = require('../../config/system');
const  dashboardRoute  = require('./dashboardroute');


module.exports = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin;
  app.use(`${PATH_ADMIN}/dashboard`, dashboardRoute);

}


