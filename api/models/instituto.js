'use strict';
module.exports = (sequelize, DataTypes) => {
  const instituto = sequelize.define('instituto', {
    nombre: DataTypes.STRING,
    direccion: DataTypes.STRING,
  }, {});


  return instituto;
};