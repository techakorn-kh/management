const express = require('express');
const router = express.Router();

const lineGroupRoute = require('../api/lineMessageAPI/lineGroup');
const messageRoute = require('../api/lineMessageApi/message');
const webhookRoute = require('../api/lineMessageAPI/webhook');

router.use('/group', lineGroupRoute);
router.use('/message', messageRoute);
router.use('/webhook', webhookRoute);

module.exports = router;