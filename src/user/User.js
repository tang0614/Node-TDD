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
        },
        activationToken: {
            type: DataTypes.STRING
        },
        inactive: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        }
    },
    {
        // Other model options go here
        db,
        modelName: 'userTable'
    }
);

module.exports = User;
