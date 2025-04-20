const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { md100Users } = require('../../models/index');
const config = require('../../config');

module.exports = {
    index: async(req, res) => {
        try {
            return res.render('pages/authen/signIn', { 
                title: 'Sign In'
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                code: 500,
                status: 'error',
                message: 'Internal Server Error'
            });
        }
    },
    signIn: async(req, res) => {
        try {
            const { is_username, is_password } = req.body;

            const result = await md100Users.findOne({
                attributes: ['username','email','password','is_change_password','is_active','system_user_uuid'],
                where: {
                    username: is_username
                },
                raw: true
            }).catch((err)=>{
                throw err;
            });

            if(!result) {
                return res.status(401).json({ code: 401, status: 'error', message: 'Your username was not found in the system.'});
            }

            if(!bcrypt.compareSync(is_password, result?.password)) {
                return res.status(401).json({ code: 401, status: 'error', message: 'Your password is incorrect. Please try again.'});
            }

            const token = jwt.sign(
                {
                    user_id: result?.system_user_uuid,
                    username: result?.username,
                    email: result?.email
                }, 
                config.TOKEN_KEY, 
                {
                    expiresIn: config.TOKEN_EXPIRE || '2h',
                }
            );

            req.session.loggedIn = true;
            req.session.user_id = result?.system_user_uuid;
            req.session.username = result?.username;
            req.session.email = result?.email;

            return res.status(200).json({ 
                code: 200, 
                status: 'success', 
                message: 'Logged in Redirect', 
                backward: '/',
                data: {
                    user_id: result?.system_user_uuid,
                    username: result?.username,
                    email: result?.email,
                    token: token
                }
            });
        } catch (err) {
            console.error(err);
            return res.status(404).json({
                code: 404,
                status: 'error',
                message: `${err}`
            });
        }
    }
};