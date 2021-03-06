const express = require('express');
const noticesRouter = express.Router({ mergeParams: true });
const controller = require('../../../controllers/nested-notices');

noticesRouter.param('id', controller.params);

noticesRouter.route('/')
  .get(controller.all)
  .post(controller.post);

noticesRouter.route('/:id')
  .get(controller.get)
  .put(controller.put)
  .delete(controller.delete);

module.exports = noticesRouter;
