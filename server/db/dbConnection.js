const {Client} = require('pg');

const dbClient = new Client({
    connectionString: process.env.DB_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = dbClient