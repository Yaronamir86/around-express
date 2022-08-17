const router = require('express').Router();
const getCards = require('../controlers/controlCards');

router.get('/cards', getCards);

module.exports = router;
