'use strict';
module.exports = (sequelize, DataTypes) => {
  const alumno = sequelize.define('alumno', {
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    id_materia: DataTypes.INTEGER
  }, {});
  
  alumno.associate = function(models) {
    alumno.hasMany(models.alumno_materia
      , {
        foreignKey: 'id_alumno_fk',
        sourceKey: 'id'
      });
  };
  return alumno;
};