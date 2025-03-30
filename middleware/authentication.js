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
}