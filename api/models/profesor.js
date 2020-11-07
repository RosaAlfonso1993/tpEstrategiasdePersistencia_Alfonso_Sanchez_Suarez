'use strict';

module.exports = (sequelize, DataTypes) => {
  const profesor = sequelize.define('profesor', {
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
  }, {});

  profesor.associate = function(models) {
    profesor.hasMany(models.curso_profesor
      ,{
        foreignKey: 'id_profesor_fk',
        sourceKey: 'id'    
      });
  };

  
  return profesor;
};