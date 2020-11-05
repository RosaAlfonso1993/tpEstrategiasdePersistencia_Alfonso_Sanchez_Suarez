'use strict';
module.exports = (sequelize, DataTypes) => {
    const instituto_carrera = sequelize.define(
        'instituto_carrera', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_carrera_fk: {
            type: DataTypes.INTEGER,
            foreignKey: true
        },
        id_instituto_fk: {
            type: DataTypes.INTEGER,
            foreignKey: true
        }
    },{});
    instituto_carrera.associate = function (models) {
      // GUARDA!
      /*
        instituto_carrera.hasOne(models.carrera
            , {
                foreignKey: 'id',
                sourceKey: 'id_carrera_fk'
            });
            alumno_materia.hasOne(models.instituto
            , {
                foreignKey: 'id',
               sourceKey: 'id_instituto_fk'
            });
        */
     };

    return instituto_carrera;
}