'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reports', {
      report_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      time: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.ENUM('InActive', 'Active', 'Pending', 'Achieved')
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      }
    }, {
      paranoid: true,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('reports');
  }
};