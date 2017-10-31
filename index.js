'use strict';

const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config');

const app = module.exports = express();

// Database connection
mongoose.connect(`mongodb://${config.mongoDB.username}:${config.mongoDB.password}@${config.mongoDB.host}/${config.mongoDB.name}`);

const compression = require('compression');
const log = require('./lib/logger');

// compress all assets and json-responses if minimal size is reached
app.use(compression());

// serve static content only from 'public' dir
app.use(express.static('./public'));

// expose routes for templates
app.use('/', (req, res, next) => {
  res.send('CMS Noticias');
});

// global errorHandler ============================================
require('./errorHandler/ErrorHandler')(app);

// set up server ==================================================
const server = app.listen(process.env.PORT || 4001, () => {
  log.info(`server started, listening on port: ${server.address().port}`);
});
