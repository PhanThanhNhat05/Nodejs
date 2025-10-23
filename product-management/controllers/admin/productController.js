
const Product = require('../../models/productModeDB');
const filterStatusHelper = require('../../helpers/filterStatus');
const searchgHelper = require('../../helpers/search');
const paginationHelper = require('../../helpers/pagination');
// [GET] admin/products
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

// [PATCH] router.patch('/change-status/:status/:id', controller.changeStatus);
module.exports.changeStatus = async (req, res) => {
  console.log(req.params)
  const status = req.params.status;
  const id = req.params.id;

  await Product.updateOne({_id: id}, {status: status})

  res.redirect("/admin/products")
  
}

//[PATCH] router.patch('/change-multi', controller.changeStatus);
module.exports.changeMulti = async (req, res) => {
   const type = req.body.type
   const ids = req.body.ids.split(", ")
   
   switch (type) {
    case "active":
      await Product.updateMany({_id: { $in: ids}}, {status: "active"})
      break;
    case "inactive":
      await Product.updateMany({_id: { $in: ids}}, {status: "inactive"})
      break;
    default:
      break;
   }
   res.redirect("/admin/products");
}

// [DELETE] /admin/products/delete/:id

module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;
  // await Product.deleteOne({_id: id}
  await Product.updateOne({_id: id}, {deleted: true , deletedAt : new Date()});
   res.redirect("/admin/products");
}