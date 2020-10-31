'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('materia_profesors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_materia_fk: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model: 'materia',
          key: 'id'
        }
      },
      id_profesor_fk: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model: 'profesors',
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
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('materia_profesors');
  }
};
