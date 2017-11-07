'use strict';

const Boom = require('boom');
const Utils = require('../Utils');

// MongoDB models  ========================
const Notice = require('../models/notice');

exports.params = (req, res, next, id) => {
  if (!Utils.isValidObjectId(id)) return next(Boom.notFound(`notice with id: ${id} does not exist!`));
  Notice.findById(id)
    .then((notice) => {
      if (notice) {
        req.notice = notice;
        next();
      } else next(Boom.notFound(`notice with id: ${id} does not exist!`));
    })
    .catch(err => next(new Error(err)));
};

exports.all = (req, res, next) => {
  Notice
    .queryWithFilter(req.query)
    .populate('page', 'name')
    .exec((err, populatedNotices) => {
      if (err) return next(new Error(err));
      res.json(populatedNotices);
    });
};

exports.get = (req, res, next) => {
  res.json(req.pagina);
};

exports.put = (req, res, next) => {
  req.notice.title = req.body.title || req.notice.title;
  req.notice.text = req.body.text || req.notice.text;
  req.notice.imageUrl = req.body.imageUrl || req.notice.imageUrl;
  req.notice.likes = req.body.likes || req.notice.likes;
  req.notice.active = req.body.active || req.notice.active;
  req.notice
    .save()
    .then(notice => res.json(notice))
    .catch(next);
};
