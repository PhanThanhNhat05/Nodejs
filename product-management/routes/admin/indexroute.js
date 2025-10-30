const systemConfig = require('../../config/system');
const dashboardRoute  = require('./dashboardroute');
const productRoute = require('./productRouter');
const productCategoryRouter = require('./product-category.router')
module.exports = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin;
  app.use(`${PATH_ADMIN}/dashboard`, dashboardRoute);
  app.use(`${PATH_ADMIN}/products`, productRoute);
  app.use(`${PATH_ADMIN}/products-category`, productCategoryRouter);
}


