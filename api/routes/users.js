'use strict';

const router = require('express').Router();
const controller = require('../controllers/users');
const passport = require('passport');

router.post('/login', passport.authenticate('local'), controller.login);

router.post('/create', controller.create);
router.post('/signup', controller.signup);

router.get('/logout', controller.logout);
router.get('/', controller.all);

module.exports = router;
