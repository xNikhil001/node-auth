const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
require("dotenv").config();
const connection = require("./src/config/db.js");
const router = require("./src/routes/routes.js");
const helmet = require("helmet");
const session = require('express-session')
const hbs = require('hbs');
const {resolve} = require('path');

const sess = {
  key: "userInfo",
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { 
    httpOnly: true,
    maxAge: 1000*60*60*24 
  }
}

app.set('views',resolve(__dirname,"views/pages"))
app.set("view engine", "hbs");
hbs.registerPartials(resolve(__dirname, 'views/partials'));
app.use('/public',express.static('public'))
app.use(helmet());
app.use(session(sess))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

// Database connection
connection();

// LISTEN TO SERVER 
app.listen(PORT,()=>{
  console.log("app running on port " + PORT);
});