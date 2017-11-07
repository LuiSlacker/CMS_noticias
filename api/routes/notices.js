'use strict';

const express = require('express');
const noticesRouter = express.Router({ mergeParams: true });
const controller = require('../controllers/notices');

noticesRouter.param('id', controller.params);

noticesRouter.get('/', controller.all);
noticesRouter.get('/:id', controller.get);

module.exports = noticesRouter;
