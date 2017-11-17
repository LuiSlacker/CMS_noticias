'use strict';

const express = require('express');
const commentsRouter = express.Router({ mergeParams: true });
const controller = require('../../../controllers/comments');

commentsRouter.param('id', controller.params);

commentsRouter.route('/')
  .get(controller.all)
  .post(controller.post);

commentsRouter.route('/:id')
  .get(controller.get)
  .put(controller.put)
  .delete(controller.delete);

module.exports = commentsRouter;
