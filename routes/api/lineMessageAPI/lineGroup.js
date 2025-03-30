const express = require('express');
const router = express.Router();

const { authen } = require('../../../middleware/authentication');

const lineGroupAPI = require('../../../controllers/lineMessageAPI/api/lineGroupAPI');

router.get('/:channel_id', authen, lineGroupAPI.get);

module.exports = router;