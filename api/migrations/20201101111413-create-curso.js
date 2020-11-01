'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('cursos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_instituto: {
        type: Sequelize.INTEGER
      },
      id_materia: {
        type: Sequelize.INTEGER
      },
      id_profesor: {
        type: Sequelize.INTEGER
      },
      id_alumno: {
        type: Sequelize.INTEGER
      },
      capacidad: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('cursos');
  }
};