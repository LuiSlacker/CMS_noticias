'use strict';

const router = require('express').Router();

router.use('/users', require('./routes/users'));

router.use('/paginas', require('./routes/paginas'));

module.exports = router;
