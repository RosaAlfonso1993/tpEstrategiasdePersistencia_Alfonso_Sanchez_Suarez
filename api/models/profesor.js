'use strict';

module.exports = (sequelize, DataTypes) => {
  const profesor = sequelize.define('profesor', {
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
  }, {});

  profesor.associate = function(models) {
    // associations can be defined here
    profesor.hasMany(models.materia_profesor
      ,{
        //as : 'Materia-Relacionada',  
        foreignKey: 'id_profesor_fk',
        sourceKey: 'id'    
      }) 
  };

  
  return profesor;
};