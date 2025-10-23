const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

  title: String,
  description: String,
  price: Number,
  discountPercentage: Number,
  stock: Number,
  // support both spellings in case DB uses one or the other
  thumbnail: String,
  status: String,
  position: Number,
  deleted: Boolean,
  deletedAt: Date
});
const Product = mongoose.model('Product', productSchema, "products");

module.exports = Product;