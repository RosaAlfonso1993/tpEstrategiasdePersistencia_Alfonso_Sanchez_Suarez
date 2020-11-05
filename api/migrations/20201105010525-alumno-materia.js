'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'alumno_materia', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        id_alumno_fk:{
          allowNull: false,
          type: Sequelize.INTEGER,
          references:{
            model:'alumnos',
            key: 'id'
           }
        },
        id_materia_fk:{
          allowNull:false,
          type: Sequelize.INTEGER,
          references:{
            model: 'materia',
            key:'id'
          }
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
    return queryInterface.dropTable('alumno_materia');
  }
};
