'use strict';
module.exports = (sequelize, DataTypes) => {
  const curso = sequelize.define('curso', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_materia_fk: {
      type: DataTypes.INTEGER,
      foreignKey: true
    },
    id_profesor_fk: {
      type: DataTypes.INTEGER,
      foreignKey: true
    },
    id_instituto_fk: {
      type: DataTypes.INTEGER,
      foreignKey: true
    },
    id_alumno_fk: {
      type: DataTypes.INTEGER,
      foreignKey: true
    },
    capacidad: {
      type: DataTypes.INTEGER,
    }, 
  });
  curso.associate = function(models) {

  };

  return curso;
};