'use strict';

const express = require('express');
const noticesRouter = express.Router({ mergeParams: true });
const controller = require('../controllers/notices');

noticesRouter.param('id', controller.params);

noticesRouter.get('/', controller.all);
noticesRouter.route('/:id')
  .get(controller.get)
  .put(controller.put);

module.exports = noticesRouter;
