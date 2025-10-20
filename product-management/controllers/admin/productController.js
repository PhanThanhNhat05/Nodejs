//[GET] admin/products
const Product = require('../../models/productModeDB');
const filterStatusHelper = require('../../helpers/filterStatus');
const searchgHelper = require('../../helpers/search');
const paginationHelper = require('../../helpers/pagination');
module.exports.index = async (req, res) => {
  console.log(req.query.status)

  //tinh nang loc status
  const filterStatus = filterStatusHelper(req.query);
  // console.log(filterStatus);

  let find = {
    deleted: false,
  }
  if (req.query.status) {
    find.status = req.query.status
  }

  //tinh nang tim kiem
  const objSearch = searchgHelper(req.query);
  // console.log(objSearch);

  if (objSearch.regex) {
    find.title = objSearch.regex;
  }


  //phân trang
  const countProducts = await Product.countDocuments({
    ...find
  });
  let objPanagination = paginationHelper({
      currentPage: 1,
      limitItem: 4,
    },
    req.query,
    countProducts
  );
  //end phân trang

  const products = await Product.find({
    ...find
  }).limit(objPanagination.limitItem).skip(objPanagination.skip);

  res.render('admin/pages/products/index', {
    pageTitle: 'Quản Lý Sản Phẩm',
    products: products,
    filterStatus: filterStatus,
    keyword: objSearch.keyword,
    pagination: objPanagination
  });
}