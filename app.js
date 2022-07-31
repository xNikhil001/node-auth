const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
require("dotenv").config();
const connection = require("./src/config/db.js");
const router = require("./src/routes/routes.js");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");

app.set("view engine", "ejs");
app.use('/public',express.static('public'))
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

// Database connection
connection();

// LISTEN TO SERVER 
app.listen(PORT,()=>{
  console.log("app running on port " + PORT);
});