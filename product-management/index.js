const express = require('express')
require('dotenv').config();
const database = require('./config/database');
const route = require('./routes/client/indexroute');
const routeAdmin = require('./routes/admin/indexroute');
const app = express()
const port = process.env.PORT || 3000;
const systemConfig = require("./config/system");

database.connect();



app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static('public'))

//app local var
app.locals.prefixAdmin = systemConfig.prefixAdmin;

//route 
route(app);
routeAdmin(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
