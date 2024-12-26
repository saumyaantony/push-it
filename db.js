const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres', 
    host: 'localhost',
    database: 'menu_app', 
    password: 'Admin@123', 
    port: 5432,
});

module.exports = pool;
