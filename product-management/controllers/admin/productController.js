//[GET] admin/products
const Product = require('../../models/productModeDB');
const filterStatusHelper = require('../../helpers/filterStatus');
const searchgHelper = require('../../helpers/search');
module.exports.index = async (req, res) => {
  console.log(req.query.status)

  //tinh nang loc status
  const filterStatus = filterStatusHelper(req.query);
  console.log(filterStatus);

  let find = {
    deleted: false,
  }
  if (req.query.status) {
    find.status = req.query.status
  }

  //tinh nang tim kiem
  const objSearch = searchgHelper(req.query);
  console.log(objSearch);

  if (objSearch.regex) {
    find.title = objSearch.regex;
  }
  const products = await Product.find({
    ...find
  });
  // console.log(products);

  res.render('admin/pages/products/index', {
    pageTitle: 'Quản Lý Sản Phẩm',
    products: products,
    filterStatus: filterStatus,
    keyword: objSearch.keyword
  });
}