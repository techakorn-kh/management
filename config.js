require('dotenv').config();

const config = {
    APP_PORT: process.env.APP_PORT || 3000,
    APP_KEY: process.env.APP_KEY || null,

    TOKEN_KEY: process.env.TOKEN_KEY || null,
    TOKEN_EXPIRE: process.env.TOKEN_EXPIRE || '1h', 

    DB_NAME: process.env.DB_NAME || '',
    DB_HOST: process.env.DB_HOST || '127.0.0.1',
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS || '',
    DB_PORT: process.env.DB_PORT,
    DB_TYPE: process.env.DB_TYPE,
    DB_CHARSET: process.env.DB_CHARSET,
    DB_TIMEZONE: process.env.DB_TIMEZONE,
}

module.exports = config;