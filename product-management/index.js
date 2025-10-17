const express = require('express')
const route = require('./routes/client/indexroute');
const app = express()
const port = 6969


app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static('public'))

//route 
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
