'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const time = {
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await queryInterface.bulkInsert(
      'permissions',
      [
        {
          name: 'view:products',
          id: 1,
          ...time,
        },
        {
          name: 'view:users',
          id: 2,
          ...time,
        },
        {
          name: 'view:motorcycles',
          id: 3,
          ...time,
        },
        {
          name: 'view:services',
          id: 4,
          ...time,
        },
        {
          name: 'view:home',
          id: 5,
          ...time,
        },

        {
          name: 'manage:products',
          id: 6,
          ...time,
        },
        {
          name: 'manage:users',
          id: 7,
          ...time,
        },
        {
          name: 'manage:motorcycles',
          id: 8,
          ...time,
        },
        {
          name: 'manage:services',
          id: 9,
          ...time,
        },
        {
          name: 'manage:home',
          id: 10,
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
