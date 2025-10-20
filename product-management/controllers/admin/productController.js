//[GET] admin/products
const Product = require('../../models/productModeDB');
const filterStatusHelper = require('../../helpers/filterStatus');
module.exports.index = async (req, res) => {
    console.log(req.query.status)

    //tinh nang loc status
    const filterStatus =  filterStatusHelper(req.query);
    console.log(filterStatus);
    
    let find = {
        deleted: false, 
    }
    if (req.query.status) {
        find.status = req.query.status
    }

   //tinh nang tim kiem
    let keyword = "";
    if(req.query.keyword){
      keyword = req.query.keyword;
      const regex = new RegExp(keyword, 'i');
      find.title = regex;
    }
    const products = await Product.find({...find});
    // console.log(products);

  res.render('admin/pages/products/index', { 
    pageTitle: 'Quản Lý Sản Phẩm', 
    products: products, 
    filterStatus: filterStatus ,
    keyword: keyword
  });
}