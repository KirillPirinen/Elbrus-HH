'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Groups', [{
      name: 'Lynxes2021',
      locationid:1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Cobras2020',
      locationid:1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Pigs2019',
      locationid:1,
      createdAt: new Date(),
      updatedAt: new Date()
    },  
  ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
