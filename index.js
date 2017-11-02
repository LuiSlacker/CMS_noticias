'use strict';

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bluebird = require('bluebird');
const config = require('./config/config');

mongoose.Promise = require('bluebird');

// Database connection
mongoose.connect(`mongodb://${config.mongoDB.username}:${config.mongoDB.password}@${config.mongoDB.host}/${config.mongoDB.name}`, {
  useMongoClient: true,
  promiseLibrary: bluebird,
});

const compression = require('compression');

// parse request body
app.use(express.json());

const log = require('./lib/logger');

// compress all assets and json-responses if minimal size is reached
app.use(compression());

// serve static content only from 'public' dir
app.use(express.static('./public'));

// expose api
app.use('/api', require('./api'));

// global errorHandler ============================================
require('./errorHandler/ErrorHandler')(app);

// set up server ==================================================
const server = app.listen(process.env.PORT || 4001, () => {
  log.info(`server started, listening on port: ${server.address().port}`);
});

module.exports = app;
