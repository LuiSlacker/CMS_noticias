const router = require('express').Router();
const controller = require('../controllers/users');
const Utils = require('../Utils');

router.param('id', controller.params);
router.post('/login', controller.login);

router.post('/create', controller.create);
router.post('/signup', controller.signup);
router.post('/forgotPassword', controller.forgotPassword);

router.get('/logout', controller.logout);

router.delete('/:id', Utils.isAuthenticated, controller.toggleUserState);
router.get('/', Utils.isAuthenticated, controller.all);
router.patch('/:id', Utils.isAuthenticated, controller.updateAssignedPages);

router.get('/:id/assignedPages', Utils.isAuthenticated, controller.fetchAssignedPages);

router.get('/userfortoken/:token', controller.getUserForToken);

module.exports = router;
