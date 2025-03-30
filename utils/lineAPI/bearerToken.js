const { line100LineChannels } = require('../../models/index');

const bearerToken = async (authorization) => {
    try {
        if(!authorization) throw `Unauthorized`;

        const token = authorization.split(' ')[1];

        if(!token) throw `Unauthorized`;

        const result = await line100LineChannels.findOne({
            where: {
                channel_access_token: token
            }
        }).catch((err)=>{
            throw err;
        });

        if(!result) throw `Your account is not registered yet. Please contact the relevant person.`;

        return {
            channel_id: result?.channel_id,
            channel_access_token: result?.channel_access_token
        }
    } catch (err) {
        throw err;
    }
}

module.exports = bearerToken;
