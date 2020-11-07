'use strict';
module.exports = (sequelize, DataTypes) => {
    const alumno_materia = sequelize.define(
        'alumno_materia', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_alumno_fk: {
            type: DataTypes.INTEGER,
            foreignKey: true
        },
        id_materia_fk: {
            type: DataTypes.INTEGER,
            foreignKey: true
        }
    },{});

    alumno_materia.associate = function (models) {
        alumno_materia.hasOne(models.alumno
            , {
                foreignKey: 'id',
                sourceKey: 'id_alumno_fk'
            });
        alumno_materia.hasOne(models.materia
            , {
                foreignKey: 'id',
                sourceKey: 'id_materia_fk'
            });
    };

    return alumno_materia;
}