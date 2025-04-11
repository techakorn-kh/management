const express = require('express');
const router = express.Router();

const webhookAPI = require('../../../controllers/lineMessageAPI/api/webhookAPI');

router.post('/webhook-event/:channel_id', webhookAPI.webhookEvent);
router.get('/webhook-event/members/:channel_id/:groupId', webhookAPI.members);

module.exports = router;