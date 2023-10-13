const router = require('express').Router();
const arsipSurat = require('./arsipSurat');
const proposal = require('./proposal');

router.use('/arsip_surat', arsipSurat);
router.use('/proposal', proposal);

module.exports = router;
