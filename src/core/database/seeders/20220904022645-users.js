'use strict';

const { hash } = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    const time = {
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const password = await hash('senha', 10);

    await queryInterface.bulkInsert(
      'users',
      [
        {
          username: 'Guilherme',
          email: 'email@email.com.br',
          password: password,
          role_id: 1,
          ...time,
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
