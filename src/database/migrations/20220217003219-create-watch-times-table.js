'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('watch_times', {
      seconds: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
      },
      profile_id: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: { model: 'profiles', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      episode_id: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: { model: 'episodes', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('watch_times')
  }
};
