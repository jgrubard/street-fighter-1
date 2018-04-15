const Sequelize = require('sequelize');
const _conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/street_fighter_1_db');

module.exports = { _conn, Sequelize }
