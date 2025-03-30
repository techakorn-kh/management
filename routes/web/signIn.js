const express = require('express');
const router = express.Router();

const authenController = require('../../controllers/authen/authenController');

router.get('/', authenController.index);
router.post('/', authenController.signIn);

module.exports = router;