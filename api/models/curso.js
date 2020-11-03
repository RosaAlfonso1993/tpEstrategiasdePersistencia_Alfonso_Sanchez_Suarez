'use strict';
module.exports = (sequelize, DataTypes) => {
  const curso = sequelize.define('curso', {
    capacidad: DataTypes.INTEGER,
    id_materia_fk : DataTypes.INTEGER
  }, {});
  curso.associate = function(models) {
    // associations can be defined here
    curso.belongsTo(
	models.materia// modelo al que pertenece
	      , {
	        as: 'curso_de_materia',  // nombre de mi relacion
	        foreignKey: 'id_curso'     // campo con el que voy a igualar
      }
    );
  };
  return curso;
};