const express = require('express');
const router = express.Router();

const { loggedIn } = require('../../middleware/authentication');

const menuController = require('../../controllers/system/menuController');
const signInRoute = require('../web/signIn');
const lineMessageApiRoute = require('../web/lineMessageAPI/index');

//Page Interface
router.get('/', (req, res) => {
    const { loggedIn } = req.session;

    if(!loggedIn) {
        return res.redirect('/sign-in');
    } else {
        return res.redirect('/menu');
    }
});

router.use('/sign-in', signInRoute);

router.get('/menu', loggedIn, menuController.index);

router.use('/line-message-api', lineMessageApiRoute);

module.exports = router;