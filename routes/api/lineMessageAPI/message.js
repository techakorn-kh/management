const express = require('express');
const router = express.Router();

const { authen } = require('../../../middleware/authentication');

const messageAPI = require('../../../controllers/lineMessageAPI/api/messageAPI');

router.post('/message/push', authen, messageAPI.messagePush);

module.exports = router;