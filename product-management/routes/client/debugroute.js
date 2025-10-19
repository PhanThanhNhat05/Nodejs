const express = require('express');
const router = express.Router();
const Product = require('../../models/productModeDB');

router.get('/products/debug', async (req, res) => {
  try {
    const products = await Product.find({ deleted: false }).limit(50);
    const normalized = products.map(p => {
      const obj = p.toObject ? p.toObject() : { ...p };
      obj.thumbnail = obj.thumbnail || obj.thumnail || obj.image || null;
      return { _id: obj._id, title: obj.title, thumbnail: obj.thumbnail };
    });
    res.json({ count: normalized.length, products: normalized });
  } catch (err) {
    res.status(500).json({ error: err.message || String(err) });
  }
});

module.exports = router;
