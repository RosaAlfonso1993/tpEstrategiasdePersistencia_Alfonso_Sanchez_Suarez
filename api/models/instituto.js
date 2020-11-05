'use strict';
module.exports = (sequelize, DataTypes) => {
  const instituto = sequelize.define('instituto', {
    nombre: DataTypes.STRING,
    direccion: DataTypes.STRING
  }, {});
  instituto.associate = function(models) {

  	instituto.hasMany(models.instituto_carrera,
    {
      foreignKey: 'id_instituto_fk',
      sourceKey: 'id'       
                                    
    });
  };
  
  return instituto;
};