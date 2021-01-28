const {Client} = require('pg');
const CONFIG = require('./config');

const DB_URL = process.env.DB_URL || CONFIG.DB_URL;
const DB_PORT = process.env.DB_PORT || CONFIG.DB_PORT;
const DB_USER = process.env.DB_USER || CONFIG.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD || CONFIG.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME || CONFIG.DB_NAME;

const dbClient = new Client({
    host: DB_URL,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME
});

module.exports = dbClient