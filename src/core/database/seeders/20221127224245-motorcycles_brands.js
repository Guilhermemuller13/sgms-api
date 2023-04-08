'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const time = {
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await queryInterface.bulkInsert(
      'motorcycles_brands',
      [
        {
          name: 'Yamaha',
          ...time,
        },
        {
          name: 'Honda',
          ...time,
        },
        {
          name: 'Bmw',
          ...time,
        },
        {
          name: 'Dafra',
          ...time,
        },
        {
          name: 'Ducati',
          ...time,
        },
        {
          name: 'Kawasaki',
          ...time,
        },
        {
          name: 'Shineray',
          ...time,
        },
        {
          name: 'Suzuki',
          ...time,
        },
        {
          name: 'Triumph',
          ...time,
        },
        {
          name: 'KTM',
          ...time,
        },
        {
          name: 'Harley-Davidson',
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
