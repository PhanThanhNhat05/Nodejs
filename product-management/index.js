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
app.set('trust proxy', 1);

app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: false }));

// flash
app.use(cookieParser('keyboard cat'));

// ✅ SỬA SESSION - dùng MongoDB store
const hasMongoUrl = Boolean(process.env.MONGO_URL);
const sessionOptions = {
  secret: process.env.SESSION_SECRET || 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'lax' : 'lax'
  }
};

if (hasMongoUrl) {
  sessionOptions.store = MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    touchAfter: 24 * 3600
  });
}

app.use(session(sessionOptions));

app.use(flash());

app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');
app.use(express.static(`${__dirname}/public`));

// app local var
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// route
route(app);
routeAdmin(app);


if (require.main === module) {
  const port = process.env.PORT || 6969;
  app.listen(port, () => console.log(`Server running on port ${port}`));
}


module.exports = app;