'use strict';
module.exports = (sequelize, DataTypes) => {
    const curso_materia = sequelize.define('cursos_materias', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_materia_fk: {
            type: DataTypes.INTEGER,
            foreignKey: true
        },
        id_curso_fk: {
            type: DataTypes.INTEGER,
            foreignKey: true
        }
    }, {});

    curso_materia.associate = function (models) {/*
        curso_materia.hasOne(models.curso
            , {
                foreignKey: 'id',
                sourceKey: 'id_curso_fk'
            });
        curso_materia.hasOne(models.materia
            , {
                foreignKey: 'id',
                sourceKey: 'id_materia_fk'
            });*/
    };

    return curso_materia;
};