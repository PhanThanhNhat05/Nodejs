//[GET] admin/products
const Product = require('../../models/productModeDB');
module.exports.index = async (req, res) => {
    const products = await Product.find({
        deleted: false
    });
    console.log(products);
//   const sampleProducts = [
//     { _id: '1', title: 'Sản phẩm 1', price: 100, status: 'active', thumbnail: '/images/ip.jpg' },
//     { _id: '2', title: 'Sản phẩm 2', price: 150, status: 'inactive', thumbnail: '/images/ip.jpg' }
//   ];
  res.render('admin/pages/products/index', { pageTitle: 'Quản Lý Sản Phẩm', products: products });
}