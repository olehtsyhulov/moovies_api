const { Client } = require('pg');
// const { connectionString } = require('../helpers/connectionStringToDb');

const pgClient = new Client({
    host: 'localhost',
    port: 5432,
    database:'movies_dnepr',
    username:'username',
    password: 'password',
});
pgClient.connect().then(() => console.log('CONNECT TO DB'));

module.exports = pgClient;
