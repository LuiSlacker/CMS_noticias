'use strict';

const User = require('../models/user');

exports.params = (req, res, next, id) => {
  User.findById(id)
    .then((user) => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.json({
          message: 'User not found',
        });
      }
    })
    .catch(err => next(new Error(err)));
};


exports.all = (req, res, next) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => next(new Error(err)));
};


exports.signup = (req, res, next) => {
  User.register(new User({
    username: req.body.username,
    email: req.body.email,
  }), req.body.password, (err, user) => {
    if (err) return next(new Error(err));
    res.status(201).json(user);
  });
};

exports.logout = (req, res, next) => {
  req.logout();
  res.redirect('/');
};

exports.login = (req, res, next) => {
  res.status(200).json(req.user);
};
