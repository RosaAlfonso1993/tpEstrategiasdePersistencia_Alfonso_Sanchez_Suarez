'use strict';
module.exports = (sequelize, DataTypes) => {
  const carrera = sequelize.define('carrera', {
    nombre: DataTypes.STRING
  }, {});
  
  //codigo de asociacion  (tiene muchos:)
  carrera.associate = function(models) {
  	carrera.hasMany(models.materia,  // Modelo al que pertenece
    {
      as: 'materia',                 // nombre de mi relacion
      foreignKey: 'id_carrera'       // campo con el que voy a igualar 
                                      
    });
    carrera.hasMany(models.instituto_carrera,
      {
        foreignKey: 'id_carrera_fk',
        sourceKey:'id'
      });
  };


  return carrera;
};