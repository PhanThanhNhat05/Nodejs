const productCategory = require("../../models/productCategoryModel.js")
const systemConfig = require("../../config/system")
const CreateTree = require("../../helpers/createTree.js")
const ProductCategory = require("../../models/productCategoryModel.js")
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

//[GET] admin/products-category/create
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

//[GET] admin/products-category/edit/:id
module.exports.edit = async (req, res) => {
  try {
     const id = req.params.id;
  const data = await ProductCategory.findOne({
    _id: id,
    deleted: false
  })
   const records = (await productCategory.find({
    deleted: false
   }));
  console.log(records)
  const newRecords = CreateTree.Tree(records);
  res.render('admin/pages/product-category/edit', {
    pageTitle: 'Chỉnh sửa danh mục sản phẩm',
    records: newRecords,
    data: data
  });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/products-category`)
  }
 
}

//[PATCH] admin/products-category/editPatch/:id
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;
  req.body.position = parseInt(req.body.position)
  await productCategory.updateOne({
    _id: id
  }, req.body)
 res.redirect(`${systemConfig.prefixAdmin}/products-category`)
  
}