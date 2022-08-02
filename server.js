const express = require('express');
const app = express();
require("dotenv").config();
const router = require("./src/routes/routes.js");
const helmet = require("helmet");
const hbs = require('hbs');
const {resolve} = require('path');
const session = require('express-session')
const sess = require('./src/config/mongoStore.js');

app.set('views',resolve(__dirname,"views/pages"))
app.set("view engine", "hbs");
hbs.registerPartials(resolve(__dirname, 'views/partials'));
app.use('/public',express.static('public'))
app.use(helmet());
app.use(session(sess))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

module.exports = app;