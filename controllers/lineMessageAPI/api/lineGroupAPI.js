const { 
    line100LineChannels, 
    line101LineGroups
} = require('../../../models/index');

module.exports = {
    get: async(req, res) => {
        try {
            const { channel_id } = req.params;

            const result = await line101LineGroups.findAll({
                raw: true
            }).catch(async (err) => {
                throw err; 
            });

            return res.status(200).json({ 
                code: 200, 
                status: 'success', 
                message: 'Data saved successfully',
                data: result
            });
            
        } catch (err) {
            console.error(err);
            return res.status(404).send(err);
        }
    }
}