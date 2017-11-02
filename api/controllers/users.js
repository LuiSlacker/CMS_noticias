'use strict';

const User = require('./../models/users');
const config = require('../../config/config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

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

exports.validateToken = (req, res, next) => {
  const token = req.body.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(
      token,
      config.secret,
      (err, decoded) => {
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });
        } else {
          next();
        }
      });
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.',
    });
  }
};

exports.all = (req, res, next) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => next(new Error(err)));
};


exports.post = (req, res, next) => {
  const user = new User(req.body);
  const password = bcrypt.hashSync(user.password, saltRounds);
  user.password = password;

  user
    .save()
    .then(newuser => res.json(newuser))
    .catch(err => next(new Error(err)));
};

exports.get = (req, res, next) => {
  res.json(req.user);
};

exports.logout = (req, res, next) => {
};

exports.login = (req, res, next) => {
  User.findOne({
    email: req.body.email,
  }, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const token = jwt.sign(user, config.secret);
        res.json({
          success: true,
          message: 'Access granted',
          token,
        });
      } else {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      }
    }
  });
};

exports.put = (req, res, next) => {
};

exports.delete = (req, res, next) => {
};
