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

exports.get = (req, res, next) => {
  res.json(req.pagina);
};

exports.all = (req, res, next) => {
  Notice
    .queryWithFilter(req.query)
    .then(paginas => res.json(paginas))
    .catch(err => next(new Error(err)));
};
