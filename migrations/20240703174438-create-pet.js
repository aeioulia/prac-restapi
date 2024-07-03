'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pets', {
      id: {
        primaryKey: true,
        type: Sequelize.CHAR(36),
        defaultValue: Sequelize.UUIDV4
      },
      animal: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: { notEmpty: true }
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: { notEmpty: true }
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: { isInt: true, notEmpty: true }
      },
      description: {
        type: Sequelize.STRING
      },
      ownerId: {
        type: Sequelize.CHAR(36)
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('pets');
  }
};
