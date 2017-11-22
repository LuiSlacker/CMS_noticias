const router = require('express').Router();
const controller = require('../controllers/users');

router.param('id', controller.params);
router.post('/login', controller.login);

router.post('/create', controller.create);
router.post('/signup', controller.signup);
router.post('/forgotPassword', controller.forgotPassword);

router.get('/logout', controller.logout);

router.delete('/:id', controller.toggleUserState);
router.get('/', controller.all);
router.patch('/:id', controller.updateAssignedPages);

router.get('/:id/assignedPages', controller.fetchAssignedPages);

router.get('/userfortoken/:token', controller.getUserForToken);

module.exports = router;
