const express = require('express')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/products-test')

const Product = mongoose.model('Product', { 
  name: String,
  title: String,
  price: Number,
  rating: Number,
  thumbnail: String
});
const app = express()
const port = 6969

app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static('public'))


app.get('/', (req, res) => {
  res.render('index', { title: 'Home', message: 'Ngo Anh Thu!' })
})

app.get('/products', async (req, res) => {
  const products = await Product.find();
  console.log(products);
  res.render('product.pug', { titlePage: 'Products', message: 'Welcome to the Products page!', products: products })
})

app.get('/users', (req, res) => {
  res.send('yeu!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
