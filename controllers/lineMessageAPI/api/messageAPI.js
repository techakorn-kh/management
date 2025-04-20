const bearerToken = require('../../../utils/lineAPI/bearerToken');
const { 
    messagePush, 
    messageQuota, 
    messageQuotaConsumption 
} = require('../../../utils/lineAPI/message');
const { 
    line100LineChannels, 
    line101LineGroups,
    line105LinePushLogs
} = require('../../../models/index');

module.exports = {
    messagePush: async(req, res) => {
        try {
            const { authorization, group_id } = req.headers, { messages } = req.body;

            const { channel_id, channel_access_token } = await bearerToken(authorization).catch((err)=>{
                throw err;
            });

            const [channel, group] = await Promise.all([
                await line100LineChannels.findOne({
                    attributes: ['channel_id','channel_access_token','limited','total'],
                    where: {
                        channel_id,
                        is_active: true
                    },
                    raw: true
                }),
                await line101LineGroups.findOne({
                    attributes: ['channel_id','group_id'],
                    where: {
                        channel_id,
                        group_id
                    },
                    raw: true
                })
            ]);
            
            if(!channel || !group) return res.status(401).json({ 
                code: 401, 
                status: `error`, 
                message: `Your account is not registered yet. Please contact the relevant person.`
            });

            const result = await messagePush({ channel_id, channel_access_token, group_id, messages}).catch((err)=>{
                throw err;
            });

            // Check Quota Message
            const [ limited, total ] = await Promise.all([
                messageQuota({ channel_id, channel_access_token }),
                messageQuotaConsumption({ channel_id, channel_access_token })
            ]);

            await line105LinePushLogs.create({
                channel_id,
                group_id,
                members: Number(total) - Number(channel?.total),
                messages
            }).catch((err)=>{
                throw err;
            });

            return res.status(200).json({ 
                code: 200, 
                status: 'success', 
                message: 'The data transmission system is complete.',
                data: {
                    channel_access_token,
                    group_id,
                    members: Number(total) - Number(channel?.total),
                    messages,
                    ...result
                }
            });
        } catch (err) {
            console.error(err);

            if (err?.data) {
                return res.status(err?.code).json({ 
                    code: err?.code, 
                    status: `${err?.status}`, 
                    message: `${err?.message || 'เกิดข้อผิดพลาด'}`
                });
            } else {
                return res.status(404).json({ 
                    code: 404, 
                    status: 'error', 
                    message: `${err?.response ? err?.response?.statusText : err}`
                });
            }
        }
    }
}