//GET] /products
const Product = require('../../models/productModeDB');

module.exports.index = async (req, res) => {
  const products = await Product.find({
    status: 'active',
    deleted: false
  }).sort({position: "desc"});

  const newProducts = products.map(product => {
    product.priceNew = (product.price * (100 - product.discountPercentage) / 100).toFixed(2);
    return product;
  });
  res.render('client/pages/products/index.pug', { pageTitle: 'Danh Sách Sản phẩm', products: newProducts });
}