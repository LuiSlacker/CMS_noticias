'use strict';

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bluebird = require('bluebird');
const config = require('./config/config');
const path = require('path');
const passport = require('passport');

mongoose.Promise = require('bluebird');

// Database connection
mongoose.connect(`mongodb://${config.mongoDB.username}:${config.mongoDB.password}@${config.mongoDB.host}/${config.mongoDB.name}`, {
  useMongoClient: true,
  promiseLibrary: bluebird,
});

const compression = require('compression');

// parse request body
app.use(express.json());

app.use(require('express-session')({
  secret: config.session.secret,
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

const User = require('./api/models/user');
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const log = require('./lib/logger');

// compress all assets and json-responses if minimal size is reached
app.use(compression());

// serve static content only from 'public' dir
app.use(express.static('./public'));

// expose api
app.use('/api', require('./api'));

app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

// global errorHandler ============================================
require('./errorHandler/ErrorHandler')(app);

// set up server ==================================================
const server = app.listen(process.env.PORT || 4001, () => {
  log.info(`server started, listening on port: ${server.address().port}`);
});

module.exports = app;
