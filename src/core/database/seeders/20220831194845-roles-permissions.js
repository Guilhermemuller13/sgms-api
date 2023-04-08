'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const time = {
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await queryInterface.bulkInsert(
      'roles_permissions',
      [
        {
          role_id: 1,
          permission_id: 1,
          ...time,
        },
        {
          role_id: 1,
          permission_id: 2,
          ...time,
        },
        {
          role_id: 1,
          permission_id: 3,
          ...time,
        },
        {
          role_id: 1,
          permission_id: 4,
          ...time,
        },
        {
          role_id: 1,
          permission_id: 5,
          ...time,
        },
        {
          role_id: 2,
          permission_id: 1,
          ...time,
        },
        {
          role_id: 2,
          permission_id: 2,
          ...time,
        },
        {
          role_id: 2,
          permission_id: 3,
          ...time,
        },
        {
          role_id: 2,
          permission_id: 4,
          ...time,
        },
        {
          role_id: 2,
          permission_id: 5,
          ...time,
        },
        {
          role_id: 3,
          permission_id: 1,
          ...time,
        },
        {
          role_id: 3,
          permission_id: 3,
          ...time,
        },
        {
          role_id: 3,
          permission_id: 5,
          ...time,
        },

        {
          role_id: 1,
          permission_id: 6,
          ...time,
        },
        {
          role_id: 1,
          permission_id: 7,
          ...time,
        },
        {
          role_id: 1,
          permission_id: 8,
          ...time,
        },
        {
          role_id: 1,
          permission_id: 9,
          ...time,
        },
        {
          role_id: 1,
          permission_id: 10,
          ...time,
        },

        {
          role_id: 2,
          permission_id: 6,
          ...time,
        },
        {
          role_id: 2,
          permission_id: 7,
          ...time,
        },
        {
          role_id: 2,
          permission_id: 8,
          ...time,
        },
        {
          role_id: 2,
          permission_id: 9,
          ...time,
        },
        {
          role_id: 2,
          permission_id: 10,
          ...time,
        },

        {
          role_id: 3,
          permission_id: 8,
          ...time,
        },
        {
          role_id: 3,
          permission_id: 9,
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
