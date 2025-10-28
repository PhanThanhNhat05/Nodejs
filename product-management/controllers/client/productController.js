//GET] /products
const Product = require('../../models/productModeDB');

module.exports.index = async (req, res) => {
  try {
    const products = await Product.find({
      status: 'active',
      deleted: false
    }).sort({position: "desc"});

    const newProducts = products.map(product => {
      product.priceNew = (product.price * (100 - product.discountPercentage) / 100).toFixed(2);
      return product;
    });
    res.render('client/pages/products/index.pug', { pageTitle: 'Danh Sách Sản phẩm', products: newProducts });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Database connection error. Please check MongoDB configuration.');
  }
}

//GET] /products/slug
module.exports.detail = async (req, res) => {
     try {
    // console.log(req.params.id)
  const find = {
    deleted : false,
    slug: req.params.slug,
    status: "active"
  };
  const product = await Product.findOne(find);
  console.log(product)
  
     res.render("client/pages/products/detail", {
      pageTitle: product.title,
      product : product
     })
  } catch (error) {
    req.flash("errorid", `Đường dẫn này không tồn tại`);
    res.redirect(`/products`)
  }
}