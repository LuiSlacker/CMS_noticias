const User = require('../models/user');
const Mailer = require('../../lib/mailer');
const Jwt = require('jsonwebtoken');
const log = require('../../lib/logger');
const bcrypt = require('bcrypt');
const Utils = require('../Utils');
const SALT_ROUNDS = 10;
const Boom = require('boom');

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
  req.user.populate('assignedPages', '_id poll name', (err, user) => {
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

      const tokenData = {
        username: user.username,
        email: user.email,
        id: user._id,
      };

      const token = Jwt.sign(tokenData, process.env.JWT_PRIVATE);
      log.info(token);

      const mailOptions = {
        from: '"CMS-noticias 👻" <CMS-noticias@noreply.com.>',
        to: req.body.email,
        subject: 'Welcome to CMS-noticias',
        html: `<b>Hello ${user.username},</b><br /><br />
              Please verify your email address and set a password by following the link below.<br />
              <a href="${process.env.SERVER_HOST}/signup?token=${token}">Verify</a><br /><br /><br />

              Greetings<br />
              Your CMS-noticas TEAM`,
      };
      Mailer.sendMail(mailOptions);
    })
    .catch(err => next(new Error(err)));
};

exports.getUserForToken = (req, res, next) => {
  Utils.verifyToken(req.params.token, (err, decoded) => {
    if (err) return next(err);
    res.json(decoded);
  });
};

exports.signup = (req, res, next) => {
  const password = bcrypt.hashSync(req.body.password, SALT_ROUNDS);
  Utils.verifyToken(req.body.token, (err, decoded) => {
    if (err) return next(err);
    User.findByIdAndUpdate(decoded.id, { $set: { password, isVerified: true } }, { new: true }, (UserErr, user) => {
      if (UserErr) return next(UserErr);
      res.json(user);
    });
  });
};

exports.forgotPassword = (req, res, next) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return next(err);
    if (!user) return next(new Error('User with this email does not exist.'));
    const tokenData = {
      username: user.username,
      email: user.email,
      id: user._id,
    };

    const token = Jwt.sign(tokenData, process.env.JWT_PRIVATE);
    log.info(token);

    const mailOptions = {
      from: '"CMS-noticias 👻" <CMS-noticias@noreply.com.>',
      to: req.body.email,
      subject: 'Password reset',
      html: `<b>Hello ${user.username},</b><br /><br />
            It seems like you forgot your password. You can reset it by following the link below.<br />
            <a href="${process.env.SERVER_HOST}/signup?token=${token}">Reset</a><br /><br /><br />

            Greetings<br />
            Your CMS-noticas TEAM`,
    };
    Mailer.sendMail(mailOptions);
    res.json(user);
  });
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return next(err);

    if (!user) return next(Boom.unauthorized('Authentication failed. User not found.'));
    if (!user.isActive) return next(Boom.unauthorized('Authentication failed. User not active.'));
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const userData = {
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        isEditor: user.isEditor,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        isVerified: user.isVerified,
        isActive: user.isActive,
        _id: user._id,
      };
      const token = Jwt.sign(userData, process.env.JWT_PRIVATE);
      res.cookie('user_token', token, { maxAge: 1000 * 60 * 30 });
      res.json({
        success: true,
        message: 'Access granted',
        user: userData,
      });
    } else return next(Boom.unauthorized('Authentication failed. Wrong password.'));
  });
};

exports.logout = (req, res, next) => {
  res.clearCookie('user_token');
  res.redirect('/');
};

exports.toggleUserState = (req, res, next) => {
  req.user.isActive = !req.user.isActive;
  req.user
    .save()
    .then(user => res.json(user))
    .catch(next);
};
