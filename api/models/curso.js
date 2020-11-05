'use strict';
module.exports = (sequelize, DataTypes) => {
  const curso = sequelize.define('cursos', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    capacidad: {
      type: DataTypes.INTEGER,
    }, 
  },{});
  curso.associate = function(models) {
   /*  //REVISAR ACA
    curso.hasMany(models.curso_materia
      ,{
        foreignKey: 'id_curso_fk',
          sourceKey: 'id'
      });
*/
  };

  return curso;
};