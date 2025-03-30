const { line100LineChannels } = require('../../../models/index');

module.exports = {
    index: async(req, res) => {
        try {
           
            return res.render('pages/lineMessageAPI/lineChannel/index', { 
                title: 'Line Channel'
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
    create: async(req, res) => {
        try {
           
            return res.render('pages/lineMessageAPI/lineChannel/create', { 
                title: 'Line Channel'
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
    store: async(req, res) => {
        try {
            const { customer_code, channel_id } = req.body;

            await line100LineChannels.findOrCreate({
                where: {
                    customer_code,
                    channel_id
                },
                defaults: req.body
            }).then(([value, created]) => {
                if (created) {
                    
                } else {
                    
                }
            }).catch(async (err) => {
                throw await handleErrorSQL(res, err); 
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
    edit: async(req, res) => {
        try {
            console.log(req.body);
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                code: 500,
                status: 'error',
                message: 'Internal Server Error'
            });
        }
    },
    update: async(req, res) => {
        try {
           
            console.log(req.body);
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                code: 500,
                status: 'error',
                message: 'Internal Server Error'
            });
        }
    },
    destroy: async(req, res) => {
        try {
           
            console.log(req.body);
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                code: 500,
                status: 'error',
                message: 'Internal Server Error'
            });
        }
    }
}