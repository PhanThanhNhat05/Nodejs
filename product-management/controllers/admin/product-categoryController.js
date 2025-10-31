const productCategory = require("../../models/productCategoryModel.js")
const systemConfig = require("../../config/system")
const CreateTree = require("../../helpers/createTree.js")
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  }
  
  const records = await productCategory.find({...find})
  const newRecords = CreateTree.Tree(records);
  res.render('admin/pages/product-category/index', {
    pageTitle: 'Quản Lý Danh Mục Sản Phẩm',
    records: newRecords
  });
}

//[POST] admin/products-category/create
module.exports.create = async (req, res) => {
  let find = {
    deleted: false,
  }
  const records = (await productCategory.find(find));
  const newRecords = CreateTree.Tree(records);
  console.log(newRecords)
  res.render('admin/pages/product-category/create', {
    pageTitle: 'Taọ danh mục sản phẩm',
    records: newRecords
  });
}

//[POST] admin/products-category/create
module.exports.createPost = async (req, res) => {
  if (req.body.position == "") {
    const count = await productCategory.countDocuments();
    req.body.position = count + 1;
  } else {
    req.body.position = parseInt(req.body.position)
  }
  const record = new productCategory(req.body);
  await record.save();
  res.redirect(`${systemConfig.prefixAdmin}/products-category/`);
  
}