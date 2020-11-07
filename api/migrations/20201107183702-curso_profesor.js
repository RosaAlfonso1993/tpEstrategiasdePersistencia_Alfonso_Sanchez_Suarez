'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
 return queryInterface.createTable(
    'curso_profesors', {
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
      id_profesor_fk:{
        allowNull:false,
        type: Sequelize.INTEGER,
        references:{
          model: 'profesors',
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
    },
    {       
      tableName: 'curso_profesors', 
      freezeTableName: true     
    }
    );
  },

  down: (queryInterface, Sequelize) => {

  return queryInterface.dropTable('curso_profesors');

  }
};
