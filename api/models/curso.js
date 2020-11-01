'use strict';
module.exports = (sequelize, DataTypes) => {
  const curso = sequelize.define('curso', {
    id_instituto: DataTypes.INTEGER,
    id_materia: DataTypes.INTEGER,
    id_profesor: DataTypes.INTEGER,
    id_alumno: DataTypes.INTEGER,
    capacidad: DataTypes.INTEGER
  }, {});
  curso.associate = function(models) {
    // associations can be defined here
  };
  return curso;
};