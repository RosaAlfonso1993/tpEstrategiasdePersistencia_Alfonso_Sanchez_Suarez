'use strict';
module.exports = (sequelize, DataTypes) => {
  const curso = sequelize.define('curso', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    capacidad: {
      type: DataTypes.INTEGER,
    }, 
  });
  curso.associate = function(models) {

  };

  return curso;
};