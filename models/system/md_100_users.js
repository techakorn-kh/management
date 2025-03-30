const { DataTypes } = require("sequelize");
const sequelize = require("../../utils/database");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const saltRounds = 10; 

const md100Users = sequelize.define('md_000_users', {
    "id": {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    "username": {
        type: DataTypes.STRING(20),
        primaryKey: true,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Username',
            },
            notNull: {
                msg: 'Username',
            },
            isEvent(value) {
                if(value.length > 20) {
                    throw 'จำนวนข้อความมีมากกว่า 20 ตัวอักษร';
                }
            }
        }
    },
    "email": {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Email',
            },
            notNull: {
                msg: 'Email',
            },
            isEvent(value) {
                if(value.length > 255) {
                    throw 'จำนวนข้อความมีมากกว่า 255 ตัวอักษร';
                }
            }
        }
    },
    "password": {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Password',
            },
            notNull: {
                msg: 'Password',
            }
        }
    },
    "is_change_password": {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
    },
    "is_active": {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
    },
    "system_user_uuid": {
        type: DataTypes.UUID(),
        primaryKey: true,
        allowNull: false
    },
}, { 
    indexes: [
        {
            unique: false,
            fields: ['username', 'email', 'system_user_uuid']
        }
    ]
});

md100Users.sync({ force: true }).then(async () => {
    await md100Users.findOrCreate({
        where: {
            username: `TECHAKORN`
        },
        defaults: {
            username: `TECHAKORN`,
            password: await bcrypt.hash(`Ch@mp**2239`, saltRounds),
            email: `techakorn.k@bigworkthailand.com`,
            system_user_uuid: uuidv4()
        },
    }).catch((err) => {
        throw err;
    });
});


module.exports = md100Users;