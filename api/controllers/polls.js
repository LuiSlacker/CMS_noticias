'use strict';

const Boom = require('boom');
const Utils = require('../Utils');

// MongoDB models  ========================
const Comment = require('../models/comment');

exports.all = (req, res, next) => {
  res.json(req.pagina.poll);
};

exports.get = (req, res, next) => {
  // res.json(req.comment);
};

exports.post = (req, res, next) => {
  req.pagina.poll.title = req.body.title;
  req.pagina.poll.question = req.body.question;
  req.pagina.poll.options = req.body.options;

  req.pagina
    .save()
    .then(() => res.sendStatus(200))
    .catch(next);
};

exports.saveVote = (req, res, next) => {
  const optionArray = req.pagina.poll.options.filter(option => option._id.equals(req.body.selectedOption));
  const [option] = optionArray;
  if (!option) return next(new Error(`${req.body.selectedOption} is not within possible ids for this poll!`));

  option.votes++;
  req.pagina
    .save()
    .then(() => res.sendStatus(200))
    .catch(next);
};

exports.delete = (req, res, next) => {
  // Comment.remove({ _id: req.params.id })
  //   .then(() => res.sendStatus(204))
  //   .catch(next);
};
