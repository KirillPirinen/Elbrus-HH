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
      firstname: {
        type: Sequelize.STRING
      },
      patronymic: {
        type: Sequelize.STRING
      },
      lastname: {
        type: Sequelize.STRING
      },
      groupid: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Groups',
          key: 'id'
        }
      },
      graduationdate: {
        type: Sequelize.DATEONLY
      },
      telegram: {
        type: Sequelize.TEXT
      },
      github: {
        type: Sequelize.TEXT
      },
      hhcvc: {
        type: Sequelize.TEXT
      },
      pdfcv: {
        type: Sequelize.TEXT
      },
      userphoto: {
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
