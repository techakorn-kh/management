const express = require('express');
const router = express.Router();

const llineChannelRoute = require('../lineMessageAPI/lineChannel');
// const signInRoute = require('../web/signIn');

// router.use('/', signInRoute);
router.use('/line_channel', llineChannelRoute);

module.exports = router;