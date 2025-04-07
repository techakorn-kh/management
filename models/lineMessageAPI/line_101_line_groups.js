const { DataTypes } = require("sequelize");
const sequelize = require("../../utils/database");

const line101LineGroups = sequelize.define('line_101_line_groups', {
    "id": { //New Requirement
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    "system_channel_uuid": {
        type: DataTypes.UUID(),
        primaryKey: true,
        allowNull: false
    },
    "channel_id": {
        type: DataTypes.STRING(50),
        primaryKey: true,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Channel ID',
            },
            notNull: {
                msg: 'Channel ID',
            },
            isEvent(value) {
                if(value.length > 50) {
                    throw 'จำนวนข้อความมีมากกว่า 50 ตัวอักษร';
                }
            }
        }
    },
    "group_id": {
        type: DataTypes.STRING(250),
        primaryKey: true,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Group ID',
            },
            notNull: {
                msg: 'Group ID',
            },
            isEvent(value) {
                if(value.length > 250) {
                    throw 'จำนวนข้อความมีมากกว่า 250 ตัวอักษร';
                }
            }
        }
    },
    "group_name": {
        type: DataTypes.STRING,
        allowNull: true
    },
    "member": {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    "type": {
        type: DataTypes.STRING(10),
        allowNull: true
    },
    "picture_url": {
        type: DataTypes.STRING,
        allowNull: true
    }
}, { 
    indexes: [
        {
            unique: false,
            fields: ['system_channel_uuid', 'channel_id', 'group_id']
        }
    ]
});

line101LineGroups.sync({ alter: true });

module.exports = line101LineGroups;