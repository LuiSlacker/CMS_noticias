const router = require('express').Router();
const controller = require('../controllers/users');
const passport = require('passport');

router.param('id', controller.params);
router.post('/login', controller.login); // , passport.authenticate('local')

router.post('/create', controller.create);
router.post('/signup', controller.signup);

router.get('/logout', controller.logout);
router.get('/', controller.all);
router.patch('/:id', controller.updateAssignedPages);

router.get('/:id/assignedPages', controller.fetchAssignedPages);

router.get('/userfortoken/:token', controller.getUserForToken);

module.exports = router;
