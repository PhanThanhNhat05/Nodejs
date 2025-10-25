
const Product = require('../../models/productModeDB');
const filterStatusHelper = require('../../helpers/filterStatus');
const searchgHelper = require('../../helpers/search');
const paginationHelper = require('../../helpers/pagination');
const systemConfig = require("../../config/system")
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
  }).sort({position: "desc"}).limit(objPanagination.limitItem).skip(objPanagination.skip);

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
  req.flash("success", "Cap nhat trang thai thanh cong")
  res.redirect("/admin/products")
  
}

//[PATCH] router.patch('/change-multi', controller.changeStatus);
module.exports.changeMulti = async (req, res) => {
   const type = req.body.type
   const ids = req.body.ids.split(", ")
   
   switch (type) {
    case "active":
      await Product.updateMany({_id: { $in: ids}}, {status: "active"})
      req.flash("success", `Cap nhat trang thai thanh cong cua ${ids.length} sp`)
      break;
    case "inactive":
      await Product.updateMany({_id: { $in: ids}}, {status: "inactive"})
      req.flash("success", `Cap nhat trang thai thanh cong cua ${ids.lenght} sp`)
      break;
    case "delete-all":
      await Product.updateMany({_id: { $in: ids}}, {deleted: true, deletedAt: new Date()})
      req.flash("success", `da xoa thanh cong ${ids.lenght} sp`)
      break;
    case "change-position":
      console.log(ids)
      for (const item of ids) {
        let[id, position] = item.split("-")
        position = parseInt(position)
        // console.log(id)
        // console.log(position)
        await Product.updateOne({_id: id}, {
        position: position
      })
      req.flash("success", `doi vi tri thanh cong ${ids.lenght} sp`)
      }
      
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
  req.flash("success", `da xoa thanh cong sp`)
   res.redirect("/admin/products");
}

//[GET] admin/products/create

module.exports.create = async (req, res) => {
     res.render("admin/pages/products/create", {
      pageTitle: "Trang tao san pham",
     })
}


//[POST] admin/products/create

module.exports.createPost = async (req, res) => {
  console.log(req.file)
  
  req.body.price = parseInt(req.body.price)
  req.body.discountPercentage = parseInt(req.body.discountPercentage)
  req.body.stock = parseInt(req.body.stock)
  if(req.body.position == "") {
    const countProducts = await Product.countDocuments();
    req.body.position = countProducts + 1;
  }
  else {
    req.body.position = parseInt(req.body.position)
  }
  if(req.file) {
  req.body.thumbnail = `/uploads/${req.file.filename}`
  }
  // console.log(req.body)
  const product = new Product(req.body);
  await product.save();

     res.redirect(`${systemConfig.prefixAdmin}/products/`);
}

//[GET] admin/products/edit/:id
module.exports.edit = async (req, res) => {
  try {
    // console.log(req.params.id)
  const find = {
    deleted : false,
    _id: req.params.id
  }
  const product = await Product.findOne(find);
  console.log(product)
  
     res.render("admin/pages/products/edit", {
      pageTitle: "sua san pham",
      product : product
     })
  } catch (error) {
    req.flash("errorid", `Đường dẫn này không tồn tại`);
    res.redirect(`${systemConfig.prefixAdmin}/products`)
  }
  
}

//[PATCH] admin/products/edit/:id
module.exports.editPatch = async (req, res) => {

  // console.log(req.body)
  req.body.price = parseInt(req.body.price)
  req.body.discountPercentage = parseInt(req.body.discountPercentage)
  req.body.stock = parseInt(req.body.stock)
  req.body.position = parseInt(req.body.position)
  if(req.file) {
  req.body.thumbnail = `/uploads/${req.file.filename}`
  }
  
  try {
    await Product.updateOne({_id: req.params.id}, req.body)
    req.flash("success", `Cap nhat thanh cong`)
  } catch (error) {
     req.flash("error", `Cap nhat that bai`)
  }

     res.redirect(`${systemConfig.prefixAdmin}/products/edit/:id`);
  
   
}