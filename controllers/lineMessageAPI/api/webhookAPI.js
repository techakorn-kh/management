const { 
    line100LineChannels, 
    line101LineGroups, 
    line104LineEventLogs 
} = require('../../../models/index');
const { 
    groupSummary, 
    groupMembersCount, 
    groupMembersIds 
} = require('../../../utils/lineAPI/groupChats');
const { messageQuota, messageQuotaConsumption } = require('../../../utils/lineAPI/message');

module.exports = {
    webhookEvent: async(req, res) => {
        try {
            let group_id = null;

            const { channel_id } = req.params, { events } = req.body;

            const result = await line100LineChannels.findOne({
                attributes: ['channel_id', 'channel_access_token','system_uuid'],
                where: {
                    channel_id,
                    is_active: true
                },
                raw: true
            }).catch((err)=>{
                throw err;
            });
            
            if(!result) return res.status(401).json({ 
                code: 401, 
                status: `error`, 
                message: `Your account is not registered yet. Please contact the relevant person.`
            });

            // Check Quota Message
            await Promise.all([
                messageQuota({ ...result }),
                messageQuotaConsumption({ ...result })
            ]);

            if(events.length > 0) {
                for (let i = 0; i < events.length; i++) {
                    const { type, groupId } = events[i]?.source;

                    await line104LineEventLogs.create({
                        channel_id,
                        group_id: groupId,
                        catagory: type,
                        type: events[i]?.type,
                        body: req.body
                    }).catch((err)=>{
                        throw err;
                    });

                    if(events[i]?.type !== 'leave' && groupId) {
                        await Promise.all([
                            groupSummary({
                                ...result,
                                groupId
                            }),
                            groupMembersCount({
                                ...result,
                                groupId
                            })
                        ]);
                    }

                    switch(type) {
                        case 'group':
                            group_id = groupId;

                            await line101LineGroups.findOrCreate({
                                where: {
                                    channel_id,
                                    group_id: groupId
                                },
                                defaults: {
                                    system_channel_uuid: result?.system_uuid,
                                    channel_id,
                                    group_id: groupId,
                                    type: events[i]?.type !== 'leave' ? 'join' : 'leave',
                                }
                            }).then(async ([value, created]) => {
                                if(!created) {
                                    await line101LineGroups.update({
                                        type: events[i]?.type !== 'leave' ? 'join' : 'leave',
                                    }, {
                                        where: {
                                            channel_id,
                                            group_id: groupId
                                        }
                                    }).catch((err)=>{
                                        throw err;
                                    });
                                }
                            }).catch((err)=>{
                                throw err;
                            });
        
                            break;

                        default:
                    }
                }
            } else {
                await line104LineEventLogs.create({
                    channel_id,
                    group_id,
                    catagory: 'webhook',
                    type: 'webhook',
                    body: req.body
                }).catch((err)=>{
                    throw err;
                });
            }

            return res.json(req.body);
        } catch (err) {
            console.error(err);
            return res.status(404).send(err);
        }
    }
}