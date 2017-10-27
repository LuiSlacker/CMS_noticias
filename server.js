'use strict';

const express = require('express');
const bodyParser = require('body-parser');
var path = require("path");

const compression = require('compression');
const log = require('./lib/logger');
const api = require('./api/v1/index');

const db = require('./config/index'); // Database connection


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// compress all assets and json-responses if minimal size is reached
app.use(compression());

// serve static content only from 'public' dir
app.use(express.static('./public'));

app.use('/', api);

app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

// global errorHandler ============================================
// require('./errorHandler/ErrorHandler')(app);

// set up server ==================================================
const server = app.listen(process.env.PORT || 4001, () => {
  log.info(`server started, listening on port: ${server.address().port}`);
});

