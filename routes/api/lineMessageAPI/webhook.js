const express = require('express');
const router = express.Router();

const webhookAPI = require('../../../controllers/lineMessageAPI/api/webhookAPI');

router.post('/webhook-event/:channel_id', webhookAPI.webhookEvent);

module.exports = router;