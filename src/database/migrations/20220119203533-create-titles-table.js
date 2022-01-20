'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('titles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      synopsis: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      ageClassification: {
        allowNull: false,
        type: Sequelize.STRING
      },
      thumbnailUrl: {
        type: Sequelize.STRING
      },
      category: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.STRING
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.STRING
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('titles')
  }
};
