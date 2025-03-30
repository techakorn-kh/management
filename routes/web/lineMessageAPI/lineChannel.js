const express = require('express');
const router = express.Router();

const lineChannelController = require('../../../controllers/lineMessageAPI/web/lineChannelController');

router.get('/', lineChannelController.index);
router.get('/create', lineChannelController.create);
router.post('/store', lineChannelController.store);
router.get('/edit/:channel_uuid', lineChannelController.edit);
router.put('/update/:channel_uuid', lineChannelController.update);
router.delete('/update/:channel_uuid', lineChannelController.destroy);

module.exports = router;