const { DataTypes } = require('sequelize');
const { sequelize } = require('../../connection/mysql');

const User = sequelize.define('product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
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