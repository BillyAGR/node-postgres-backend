'use strict';

const { Sequelize } = require('sequelize');

module.exports = {
  async up(queryInterface) {

    const table = await queryInterface.describeTable('users');

    if (!table.role) {
      await queryInterface.addColumn('users', 'role', {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'customer',
      });
    }
  },

  async down(queryInterface) {

    const table = await queryInterface.describeTable('users');

    if (table.role) {
      await queryInterface.removeColumn('users', 'role');
    }
  }
};
