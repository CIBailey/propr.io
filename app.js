require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
const hbs = require("hbs");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");

//I put the code for the passport-setup here - nadjie
require("./config/passport-setup.js");

mongoose
  .connect("mongodb://localhost/proprio", { useNewUrlParser: true })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();

// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(
  require("node-sass-middleware")({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    sourceMap: true
  })
);

// we will need partilas later so I put the code here - nadjie
// hbs.registerPartials(path.join(__dirname, "views", "partials"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

// Express app to create SESSION - nadjie
app.use(
  session({
    saveUninitialized: true,
    resave: true,
    secret: "????", // need to see what string to put here
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

// Passport to use in our routes - nadjie
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
  req.flash();
  res.locals.messages = req.flash();
  res.locals.currentUser = req.user;
  next();
});

// default value for title local
app.locals.title = "propr.io";

///add all routes to this area
const index = require("./routes/other-route");
app.use("/", index);

// all our new routes go here

const auth = require("./routes/form-route.js");
app.use("/", auth); // need to check this

const list = require("./routes/list-route.js");
app.use("/", list);

const other = require("./routes/other-route.js");
app.use("/", other);

module.exports = app;
