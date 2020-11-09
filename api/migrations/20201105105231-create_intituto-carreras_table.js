'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
    'instituto_carreras', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_instituto_fk:{
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model:'institutos',
          key: 'id'
         }
        },
      id_carrera_fk:{
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model:'carreras',
          key: 'id'
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
    
    return queryInterface.dropTable('instituto_carreras');
  
  }
};
