//[GET] admin/products
module.exports.index = (req, res) => {
  const sampleProducts = [
    { _id: '1', title: 'Sản phẩm 1', price: 100, status: 'active', thumbnail: '/images/ip.jpg' },
    { _id: '2', title: 'Sản phẩm 2', price: 150, status: 'inactive', thumbnail: '/images/ip.jpg' }
  ];
  res.render('admin/pages/products/index', { pageTitle: 'Quản Lý Sản Phẩm', products: sampleProducts });
}