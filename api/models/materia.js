'use strict';
module.exports = (sequelize, DataTypes) => {
  const materia = sequelize.define('materia', {
    nombre: DataTypes.STRING,
  }, {});

  materia.associate = function (models) {
    materia.hasMany(models.materia_profesor
      , { 
        foreignKey: 'id_materia_fk',
        sourceKey: 'id'
      });
    materia.hasMany(models.alumno_materia
      , {
        foreignKey: 'id_materia_fk',
        sourceKey: 'id'
      });
    /*
    materia.hasMany(models.curso_materia,
    {
      foreignKey: 'id_materia_fk',
        sourceKey: 'id'
    });
    */
    // materia.belongsTo(models.carrera// modelo al que pertenece
    //   , {
    //     as: 'Carrera-Relacionada',  // nombre de mi relacion
    //     foreignKey: 'id_carrera'     // campo con el que voy a igualar
    //   })
  };
  return materia;
};