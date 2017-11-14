'use strict';

const User = require('../models/user');
const Mailer = require('../../lib/mailer');

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

exports.updateAssignedPages = (req, res, next) => {
  if (req.body.assignedPages === undefined) return next(new Error('assigned pages not defined!'));
  req.user.assignedPages = req.body.assignedPages;
  req.user
    .save()
    .then(user => res.json(user))
    .catch(next);
};

exports.fetchAssignedPages = (req, res, next) => {
  req.user.populate('assignedPages', '_id, name', (err, user) => {
    if (err) return next(err);
    res.json(user.assignedPages);
  });
};

exports.create = (req, res, next) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
  });
  newUser
    .save()
    .then((user) => {
      res.status(201).json(user);

      const mailOptions = {
        from: '"CMS-noticias 👻" <CMS-noticias@noreply.com.>', // sender address
        to: req.body.email, // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>', // html body
      };
      Mailer.sendMail(mailOptions);
    })
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
