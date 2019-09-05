const express = require('express');
const app = express();
const routes = require('./Routes/DatabaseRoute');

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', express.json(), routes);
module.exports = app;

