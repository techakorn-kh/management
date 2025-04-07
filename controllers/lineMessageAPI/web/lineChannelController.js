const { line100LineChannels } = require('../../../models/index');
const { v4: uuidv4 } = require('uuid');

module.exports = {
    index: async(req, res) => {
        try {
            const result = await line100LineChannels.findAll({
                order: [['channel_id', 'ASC']],
                raw: true,
            }).catch((err) => {
                throw err;
            });
           
            return res.render('pages/lineMessageAPI/lineChannel/index', { 
                title: 'Line Channels',
                arr: result
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
                title: 'Line Channels'
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
                defaults: {
                    ...req.body,
                    system_uuid: uuidv4()
                }
            }).then(([value, created]) => {
                if (created) {
                    return res.status(200).json({ 
                        code: 200, 
                        status: 'success', 
                        message: 'Data saved successfully',
                        data: {
                            ...value.toJSON()
                        }
                    });
                } else {
                    return res.status(404).json({ 
                        code: 404, 
                        status: 'error', 
                        message: 'Duplicate data found in the system. Unable to create a new record.'
                    });
                }
            }).catch(async (err) => {
                throw err; 
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
            const { system_uuid } = req.params;

            await line100LineChannels.update({
                ...req.body
            }, {
                where: {
                    system_uuid
                }
            }).then(([updated]) => {
                if (updated) {
                    return res.status(200).json({ 
                        code: 200, 
                        status: 'success', 
                        message: 'Data has been updated successfully.'
                    });
                } else {
                    return res.status(404).json({ 
                        code: 404, 
                        status: 'error', 
                        message: 'No data found for the requested update.'
                    });
                }
            }).catch(async (err) => {
                throw err; 
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
    destroy: async(req, res) => {
        try {
            const { system_uuid } = req.params;

            await line100LineChannels.destroy({
                where: {
                    system_uuid
                }
            }).then((deleted) => {
                if (deleted) {
                    return res.status(200).json({ 
                        code: 200, 
                        status: 'success', 
                        message: 'Data has been successfully deleted.'
                    });
                } else {
                    return res.status(404).json({ 
                        code: 404, 
                        status: 'error', 
                        message: 'Deletion failed. The record could not be removed.'
                    });
                }
            }).catch(async (err) => {
                throw err; 
            });
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