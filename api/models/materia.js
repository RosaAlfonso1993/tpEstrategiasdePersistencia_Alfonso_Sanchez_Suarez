'use strict';
module.exports = (sequelize, DataTypes) => {
  const materia = sequelize.define('materia', {
    nombre: DataTypes.STRING,
  }, {});

  materia.associate = function (models) {
    materia.hasMany(models.alumno_materia
      , {
        foreignKey: 'id_materia_fk',
        sourceKey: 'id'
      });
    materia.hasMany(models.curso_materia,
    {
      foreignKey: 'id_materia_fk',
      sourceKey: 'id'
    });
    materia.hasMany(models.transaccionCarrera_Materia,
      {
        foreignKey: 'id_materia_fk',
        sourceKey: 'id'
      });
  };
  return materia;
};