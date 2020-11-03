'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('carrera_materia', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_carrera_fk:{
        allowNull:false,
        type: Sequelize.INTEGER,
        references:[
          model:'carrera',
          key: 'id'        ]
      },
      id_materia_fk:{
        allowNull:false,
        type: Sequelize.INTEGER,
        references:[
          model:'materia',
          key: 'id'        ]
      };
  });
  }

  down: (queryInterface, Sequelize) => {

    return queryInterface.dropTable('carrera_materia');
  }
};
