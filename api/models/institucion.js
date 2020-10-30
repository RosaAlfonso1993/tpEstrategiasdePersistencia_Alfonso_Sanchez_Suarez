'use strict';
module.exports = (sequelize, DataTypes) => {
  const institucion = sequelize.define('institucion', {
    nombre: DataTypes.STRING,
    direccion: DataTypes.STRING,
    ciudad: DataTypes.STRING,
    pais: DataTypes.STRING
  }, {});
  institucion.associate = function(models) {
    // associations can be defined here
  };
  return institucion;
};