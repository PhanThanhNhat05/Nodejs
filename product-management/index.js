const express = require('express');
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require('connect-mongo'); // ← THÊM

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

// ✅ SỬA SESSION - dùng MongoDB store
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    touchAfter: 24 * 3600
  }),
  cookie: { 
    maxAge: 60000,
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    httpOnly: true
  }
}));

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