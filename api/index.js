const router = require('express').Router();
const Utils = require('./Utils');

// router.post('*', Utils.isAuthenticated);
// router.put('*', Utils.isAuthenticated);
// router.delete('*', Utils.isAuthenticated);

router.use('/users', require('./routes/users'));
router.use('/paginas', require('./routes/paginas'));
router.use('/notices', require('./routes/notices'));

module.exports = router;
