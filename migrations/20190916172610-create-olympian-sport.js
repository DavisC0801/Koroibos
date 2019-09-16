'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Olympian_Sports', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      event: {
        type: Sequelize.STRING
      },
      medal: {
        type: Sequelize.STRING
      },
      SportId: {
        type: Sequelize.BIGINT,
        references: {
          model: 'Sports',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      OlympianId: {
        type: Sequelize.BIGINT,
        references: {
          model: 'Olympians',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Olympian_Sports');
  }
};
