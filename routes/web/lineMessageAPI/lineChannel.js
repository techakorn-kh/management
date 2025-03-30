const express = require('express');
const router = express.Router();

const lineChannelController = require('../../../controllers/lineMessageAPI/web/lineChannelController');

router.get('/', lineChannelController.index);
router.get('/create', lineChannelController.create);
router.post('/store', lineChannelController.store);
router.get('/edit/:system_uuid', lineChannelController.edit);
router.put('/update/:system_uuid', lineChannelController.update);
router.delete('/delete/:system_uuid', lineChannelController.destroy);

module.exports = router;