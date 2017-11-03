'use strict';

const Boom = require('boom');
const Utils = require('../Utils');

// MongoDB models  ========================
const Comment = require('../models/comment');

exports.params = (req, res, next, id) => {
  if (!Utils.isValidObjectId(id)) return next(Boom.notFound(`notice with id: ${id} does not exist!`));
  Comment.findById(id)
    .then((comment) => {
      if (comment) {
        req.comment = comment;
        next();
      } else next(Boom.notFound(`comment with id: ${id} does not exist!`));
    })
    .catch(err => next(new Error(err)));
};

exports.all = (req, res, next) => {
  req.notice
    .populate('comments', (err, populatedNotice) => {
      if (err) return next(err);
      res.json(populatedNotice.comments);
    });
};

exports.get = (req, res, next) => {
  res.json(req.comment);
};

exports.post = (req, res, next) => {
  const newComment = new Comment(req.body);
  newComment
    .save()
    .then(() => {
      req.notice.comments.push(newComment);
      req.notice
        .save()
        .then(() => res.sendStatus(201));
    })
    .catch(next);
};

exports.put = (req, res, next) => {
  req.comment.text = req.body.text || req.comment.text;
  req.comment
    .save()
    .then(comment => res.json(comment))
    .catch(next);
};

exports.delete = (req, res, next) => {
  Comment.remove({ _id: req.params.id })
    .then(() => res.sendStatus(204))
    .catch(next);
};
