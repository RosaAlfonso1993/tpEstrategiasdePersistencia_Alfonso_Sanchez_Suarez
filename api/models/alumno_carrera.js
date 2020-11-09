'use strict';
module.exports = (sequelize, DataTypes) => {
    const alumno_carrera = sequelize.define(
        'alumno_carrera', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_alumno_fk: {
            type: DataTypes.INTEGER,
            foreignKey: true
        },
        id_carrera_fk: {
            type: DataTypes.INTEGER,
            foreignKey: true
        }
    },{});

    alumno_carrera.associate = function (models) {
        alumno_carrera.hasOne(models.alumno
            , {
                foreignKey: 'id',
                sourceKey: 'id_alumno_fk'
            });
        alumno_carrera.hasOne(models.carrera
            , {
                foreignKey: 'id',
                sourceKey: 'id_carrera_fk'
            });
    };

    return alumno_carrera;
}