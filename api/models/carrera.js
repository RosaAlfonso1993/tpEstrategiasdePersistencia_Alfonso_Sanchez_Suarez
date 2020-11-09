'use strict';
module.exports = (sequelize, DataTypes) => {
  const carrera = sequelize.define('carrera', {
    nombre: DataTypes.STRING
  }, {});

  carrera.associate = function (models) {
    carrera.hasMany(models.instituto_carrera,
      {
        foreignKey: 'id_carrera_fk',
        sourceKey: 'id'
      });
    carrera.hasMany(models.transaccionCarrera_Materia,
      {
        foreignKey: 'id_carrera_fk',
        sourceKey: 'id'
      });
    carrera.hasMany(models.alumno_carrera,
      {
        foreignKey: 'id_carrera_fk',
        sourceKey: 'id'
      });
  };

  return carrera;
};