'use strict';

const router = require('express').Router();
const controller = require('../controllers/users');
const passport = require('passport');

router.post('/login', passport.authenticate('local'), controller.login);

router.post('/signup', controller.signup);

router.get('/logout', controller.logout);

module.exports = router;
