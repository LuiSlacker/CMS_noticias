'use strict';

const router = require('express').Router();

router.use('/users', require('./routes/users'));
router.use('/paginas', require('./routes/paginas'));
router.use('/notices', require('./routes/notices'));

module.exports = router;
