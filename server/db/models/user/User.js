const { DataTypes } = require('sequelize');
const { sequelize } = require('../../connection/mysql');

const User = sequelize.define('user', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    mobile: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    createdAt: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.DATE,
    },
    updatedAt: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.DATE,
    }
});

module.exports = User;