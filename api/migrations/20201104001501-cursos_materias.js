'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
    'curso_materia', {
      id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_curso_fk:{
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model:'cursos',         //////REVISAR POR LAS DUDAS
          key:'id'
         }
      },
      id_materia_fk:{
        allowNull:false,
        type: Sequelize.INTEGER,
        references:{
          model:'materia',       ////REVISAR POR LAS DUDAS
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
    return queryInterface.dropTable('curso_materia');
  }
};
