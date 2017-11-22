const express = require('express');
const paginasRouter = express.Router({ mergeParams: true });
const controller = require('../../controllers/paginas');
const Utils = require('../../Utils');

paginasRouter.param('id', controller.params);

paginasRouter.get('/', controller.all);
paginasRouter.post('/', Utils.isAuthenticated, controller.post);

paginasRouter.route('/:id')
  .get(controller.get)
  .put(controller.put)
  .delete(controller.delete);

// include notices and poll subrouter
paginasRouter.use('/:id/notices', require('./notices'));
paginasRouter.use('/:id/poll', require('./poll'));

module.exports = paginasRouter;

