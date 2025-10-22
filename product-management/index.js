const express = require('express')
const methodOverride = require("method-override")
const bodyParser = require("body-parser")
require('dotenv').config();
const database = require('./config/database');
const route = require('./routes/client/indexroute');
const routeAdmin = require('./routes/admin/indexroute');

const port = process.env.PORT || 3000;
const systemConfig = require("./config/system");

database.connect();
const app = express();
app.use(methodOverride("_method"))
app.use(bodyParser.urlencoded({extended: false}))


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
