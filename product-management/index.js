const express = require('express');
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");

require('dotenv').config();
const database = require('./config/database');
const route = require('./routes/client/indexroute');
const routeAdmin = require('./routes/admin/indexroute');
const systemConfig = require("./config/system");

database.connect();
const app = express();

app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: false }));

// flash
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());

app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');
app.use(express.static(`${__dirname}/public`));

// app local var
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// route
route(app);
routeAdmin(app);

// ✅ Nếu chạy local thì mở cổng
if (require.main === module) {
  const port = process.env.PORT || 6969;
  app.listen(port, () => console.log(`Server running on port ${port}`));
}

// ✅ Nếu deploy lên Vercel thì export app
module.exports = app;
