'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        name: {
            allowNull: false,
            type: Sequelize.STRING,
        },
        email: {
            allowNull: false,
            type: Sequelize.STRING,
        },
        password: {
            allowNull: false,
            type: Sequelize.STRING,
        },
        mobile: {
            allowNull: true,
            type: Sequelize.STRING,
        },
        createdAt: {
            type: Sequelize.STRING,
            defaultValue: Sequelize.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: Sequelize.STRING,
            defaultValue: Sequelize.DATE,
            allowNull: false,
        }
      });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('users');
  }
};
