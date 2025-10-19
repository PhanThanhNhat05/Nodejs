//[GET] admin/products
const Product = require('../../models/productModeDB');
module.exports.index = async (req, res) => {
    console.log(req.query.status)
    let filterStatus = [
        { name: "Tất cả", value: "", class: "" },
        { name: "Hoạt Động", value: "active", class: "" },
        { name: "Ngừng Hoạt Động", value: "inactive", class: "" }
    ];
    if(req.query.status){
          const index = filterStatus.findIndex(f => f.value === req.query.status);
          filterStatus[index].class = "active";
    } else {
        const index = filterStatus.findIndex(f => f.value === "");
          filterStatus[index].class = "active";

    }
    
    let find = {
        deleted: false
    }
    if(req.query.status){
        find.status = req.query.status
    }
    const products = await Product.find({...find});
    // console.log(products);

  res.render('admin/pages/products/index', { 
    pageTitle: 'Quản Lý Sản Phẩm', 
    products: products, 
    filterStatus: filterStatus 
  });
}