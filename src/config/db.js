const { Sequelize } = require('sequelize');

const db = new Sequelize({
    dialect: 'sqlite',
    storage: 'path/to/database.sqlite'
});

module.exports = db;
