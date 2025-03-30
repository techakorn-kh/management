const config = require('../config');

module.exports = {
    loggedIn: async(req, res, next) => {
        try {
            const { loggedIn } = req.session;

            if(!loggedIn) {
                return res.redirect('/sign-in');
            } else {
                next();
            }
        } catch (err) {
            console.error(err);
        }
    },
    authen: async(req, res, next) => {
        try {
            const { access_key } = req.headers;

            if(!access_key) return res.status(401).json({ code: 401, status: 'error', message: 'Unauthorized'});

            if(access_key !== config.APP_KEY) return res.status(401).json({ code: 401, status: 'error', message: 'Unauthorized'});

            return next();
        } catch (err) {
            console.error(err);
        }
    },
} 