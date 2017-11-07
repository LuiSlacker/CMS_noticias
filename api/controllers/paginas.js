'use strict';

const Boom = require('boom');
const Utils = require('../Utils');

// MongoDB models  ========================
const Pagina = require('../models/pagina');

exports.params = (req, res, next, id) => {
  if (!Utils.isValidObjectId(id)) return next(Boom.notFound(`pagina with id: ${id} does not exist!`));
  Pagina.findById(id)
    .then((pagina) => {
      if (pagina) {
        req.pagina = pagina;
        req.paginId = id;
        next();
      } else next(Boom.notFound(`pagina with id: ${id} does not exist!`));
    })
    .catch(err => next(new Error(err)));
};

exports.all = (req, res, next) => {
  Pagina.find()
    .then(paginas => res.json(paginas))
    .catch(err => next(new Error(err)));
};

exports.get = (req, res, next) => {
  res.json(req.pagina);
};

exports.post = (req, res, next) => {
  const newPagina = new Pagina(req.body);
  newPagina
    .save()
    .then(pagina => res.json(pagina))
    .catch(next);
};

exports.put = (req, res, next) => {
  req.pagina.name = req.body.name || req.pagina.name;
  req.pagina
    .save()
    .then(pagina => res.json(pagina))
    .catch(next);
};

exports.delete = (req, res, next) => {
  Pagina.remove({ _id: req.params.id })
    .then(() => res.sendStatus(204))
    .catch(next);
};
