const { DataTypes } = require("sequelize");
const sequelize = require("../../utils/database");

const line100LineChannels = sequelize.define('line_100_line_channels', {
    "id": {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    "customer_code": {
        type: DataTypes.STRING(50),
        primaryKey: true,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Customer code',
            },
            notNull: {
                msg: 'Customer code',
            },
            isEvent(value) {
                if(value.length > 50) {
                    throw 'จำนวนข้อความมีมากกว่า 50 ตัวอักษร';
                }
            }
        }
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
    "channel_name": {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Channel name',
            },
            notNull: {
                msg: 'Channel name',
            },
            isEvent(value) {
                if(value.length > 50) {
                    throw 'จำนวนข้อความมีมากกว่า 50 ตัวอักษร';
                }
            }
        }
    },
    "channel_desc": {
        type: DataTypes.STRING(500),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Channel description',
            },
            notNull: {
                msg: 'Channel description',
            },
            isEvent(value) {
                if(value.length > 500) {
                    throw 'จำนวนข้อความมีมากกว่า 500 ตัวอักษร';
                }
            }
        }
    },
    "channel_secret": {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Channel secret',
            },
            notNull: {
                msg: 'Channel secret',
            },
            isEvent(value) {
                if(value.length > 100) {
                    throw 'จำนวนข้อความมีมากกว่า 100 ตัวอักษร';
                }
            }
        }
    },
    "channel_access_token": {
        type: DataTypes.STRING(250),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Channel secret',
            },
            notNull: {
                msg: 'Channel secret',
            },
            isEvent(value) {
                if(value.length > 250) {
                    throw 'จำนวนข้อความมีมากกว่า 250 ตัวอักษร';
                }
            }
        }
    },
    "channel_icon": {
        type: DataTypes.TEXT('long'),
        allowNull: true
    },
    "limited": {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    "total": {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    "is_active": {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
    },
    "is_delete": {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    "is_expire": {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    "expire_date": {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    "system_uuid": {
        type: DataTypes.UUID(),
        primaryKey: true,
        allowNull: false
    },
}, { 
    indexes: [
        {
            unique: false,
            fields: ['customer_code','channel_id','system_uuid']
        }
    ]
});

line100LineChannels.sync({ alter: true });

module.exports = line100LineChannels;