const db = require('../config/db');
const { Sequelize, DataTypes } = require('sequelize');
const User = db.define(
    'user',
    {
        // Model attributes are defined here
        username: {
            type: DataTypes.STRING,
            unique: false
        },
        email: {
            type: DataTypes.STRING,
            unique: false
        },
        password: {
            type: DataTypes.STRING,
            unique: false
        }
    },
    {
        // Other model options go here
        db,
        modelName: 'users'
    }
);

module.exports = User;
