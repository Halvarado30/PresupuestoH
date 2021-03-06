const mongoose = require("mongoose");
require("./config/db");
const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const router = require("./routes/index");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const bodyParser = require("body-parser");
const flash = require("connect-flash");

const passport = require("./config/passport");

// Habilitar el archivo de variales de entorno
require("dotenv").config({ path: "variables.env" });

const app = express();

// Habilitar body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Habilitar Handlebars como Template Engine
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "layout",
    helpers: require("./helpers/handlebars")
  })
);

app.set("view engine", "handlebars");

// Definir ruta para archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Creación de la sesión y de la cookie
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SECRET,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Alertas y flash messages
app.use(flash());

// Crear nuestro middleware para los mensajes
app.use((req, res, next) => {
  res.locals.messages = flash.messages;
  next();
});

app.use("/", router());

// 404
app.use((req, res, next) => {
  next(createError(404, "La página que has solicitado no existe"));
});

app.use((error, req, res, next) => {
  const status = error.status || 500;
  res.locals.status = status;
  res.status(status);

  res.render("404", {
    layout: "layout2"
  });
});

app.listen(process.env.PORT);
