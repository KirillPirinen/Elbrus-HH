'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {


     await queryInterface.bulkInsert('Users', [{
    firstname: 'Иван',
    patronymic: 'Иван',
    lastname: 'Иван',
    groupid: 1,
    graduationdate: new Date(),
    telegram: 'telegtam',
    github: 'githun',
    hhcv: 'url',
    pdfcv: null,
    userphoto: 'url',
    createdAt: new Date(),
    updatedAt: new Date()
    },
    {
      firstname: 'Петя',
      patronymic: 'Петя',
      lastname: 'Петя',
      groupid: 1,
      graduationdate: new Date(),
      telegram: 'telegtam',
      github: 'githun',
      hhcv: 'url',
      pdfcv: null,
      userphoto: 'url',
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
        firstname: 'Вася',
        patronymic: 'Вася',
        lastname: 'Вася',
        groupid: 1,
        graduationdate: new Date(),
        telegram: 'telegtam',
        github: 'githun',
        hhcv: 'url',
        pdfcv: null,
        userphoto: 'url',
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
