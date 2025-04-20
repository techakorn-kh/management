const { DataTypes } = require("sequelize");
const sequelize = require("../../utils/database");

const line105LinePushLogs = sequelize.define('line_105_line_push_logs', {
    "id": { //New Requirement
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    "channel_id": {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    "group_id": {
        type: DataTypes.STRING,
        allowNull: true
    },
    "members": {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    "messages": {
        type: DataTypes.TEXT('long'),
        allowNull: true
    }
}, { 
    indexes: [
        {
            fields: ['channel_id']
        }
    ]
});

line105LinePushLogs.sync({ alter: true });

module.exports = line105LinePushLogs;