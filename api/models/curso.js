'use strict';
module.exports = (sequelize, DataTypes) => {
  const curso = sequelize.define('curso', {
    institucion: DataTypes.INTEGER,
    profesor: DataTypes.INTEGER,
    materia: DataTypes.INTEGER,
    alumno: DataTypes.INTEGER,
    capacidad: DataTypes.INTEGER
  }, {});
  curso.associate = function(models) {
    // associations can be defined here
  };
  return curso;
};