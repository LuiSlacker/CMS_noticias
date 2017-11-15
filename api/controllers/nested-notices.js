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
  req.pagina
    .populate('notices', (err, populatedPagina) => {
      if (err) return next(err);
      const notices = populatedPagina.notices.filter(notice => notice.active);
      res.json(notices);
    });
};

exports.get = (req, res, next) => {
  res.json(req.notice);
};

exports.post = (req, res, next) => {
  const newNotice = new Notice(req.body);
  newNotice.page = req.paginId;
  newNotice
    .save()
    .then(() => {
      req.pagina.notices.push(newNotice);
      req.pagina
        .save()
        .then(() => res.sendStatus(201));
    })
    .catch(next);
};

exports.put = (req, res, next) => {
  req.notice.title = req.body.title || req.notice.title;
  req.notice.text = req.body.text || req.notice.text;
  req.notice.imageUrl = req.body.imageUrl || req.notice.imageUrl;
  req.notice.likes = req.body.likes || req.notice.likes;
  req.notice
    .save()
    .then(notice => res.json(notice))
    .catch(next);
};

exports.delete = (req, res, next) => {
  Notice.remove({ _id: req.params.id })
    .then(() => res.sendStatus(204))
    .catch(next);
};
