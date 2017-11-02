'use strict';

const paginasRouter = require('express').Router();
const controller = require('../controllers/paginas');

paginasRouter.param('id', controller.params);

paginasRouter.route('/')
  .get(controller.all)
  .post(controller.post);

paginasRouter.route('/:id')
  .get(controller.get)
  .put(controller.put)
  .delete(controller.delete);

module.exports = paginasRouter;
