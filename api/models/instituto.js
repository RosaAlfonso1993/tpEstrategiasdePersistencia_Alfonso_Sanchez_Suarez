'use strict';
module.exports = (sequelize, DataTypes) => {
  const instituto = sequelize.define('instituto', {
    nombre: DataTypes.STRING,
    direccion: DataTypes.STRING
  }, {});
  instituto.associate = function(models) {

  	instituto.hasMany(models.carrera,
    {
      as: 'carrera',                 // nombre de mi relacion
      foreignKey: 'id_carrera'       // campo con el que voy a igualar 
                                      //PROBANDO
    })
  };
  
  return instituto;
};