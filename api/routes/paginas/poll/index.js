'use strict';

const express = require('express');
const pollRouter = express.Router({ mergeParams: true });
const controller = require('../../../controllers/polls');

pollRouter.route('/')
  .get(controller.all)
  .post(controller.post)
  .put(controller.saveVote);

module.exports = pollRouter;

