'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      patronymic: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      group: {
        type: Sequelize.STRING
      },
      graduationDate: {
        type: Sequelize.DATEONLY
      },
      telegramUsername: {
        type: Sequelize.TEXT
      },
      gitHub: {
        type: Sequelize.TEXT
      },
      hhCV: {
        type: Sequelize.TEXT
      },
      pdfCV: {
        type: Sequelize.TEXT
      },
      userPhoto: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};