'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
    'transaccionCarrera_Materia', {
      id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_carrera_fk:{
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model:'carreras',
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
    return queryInterface.dropTable('transaccionCarrera_Materia');
  }
};


