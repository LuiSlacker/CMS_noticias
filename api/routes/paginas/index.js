'use strict';

const express = require('express');
const paginasRouter = express.Router({ mergeParams: true });
const controller = require('../../controllers/paginas');

paginasRouter.param('id', controller.params);

paginasRouter.route('/')
  .get(controller.all)
  .post(controller.post);

paginasRouter.route('/:id')
  .get(controller.get)
  .put(controller.put)
  .delete(controller.delete);

// include notices subrouter
paginasRouter.use('/:id/notices', require('./notices'));

module.exports = paginasRouter;

