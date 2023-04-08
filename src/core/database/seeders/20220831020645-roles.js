'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const time = {
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await queryInterface.bulkInsert(
      'roles',
      [
        {
          name: 'root',
          id: 1,
          ...time,
        },
        {
          name: 'administrator',
          id: 2,
          ...time,
        },
        {
          name: 'user',
          id: 3,
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
