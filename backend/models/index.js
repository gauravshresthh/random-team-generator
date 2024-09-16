const { Sequelize } = require('sequelize');
const config = require('../config/database');
const sequelize = new Sequelize(config.development);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Player = require('./player')(sequelize, Sequelize);
db.Team = require('./team')(sequelize, Sequelize);

// Define associations here

module.exports = db;
