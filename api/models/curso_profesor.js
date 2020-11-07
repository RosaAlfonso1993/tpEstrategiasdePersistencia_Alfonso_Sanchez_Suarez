'use strict';
module.exports = (sequelize, DataTypes) => {
    const curso_profesor = sequelize.define('curso_profesor', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_curso_fk: {
            type: DataTypes.INTEGER,
            foreignKey: true
        },
        id_profesor_fk: {
            type: DataTypes.INTEGER,
            foreignKey: true
        }
    }, {});

    curso_profesor.associate = function (models) {
        curso_profesor.hasOne(models.profesor
            , {
                foreignKey: 'id',
                sourceKey: 'id_profesor_fk'
            });
        curso_profesor.hasOne(models.curso
            , {
                foreignKey: 'id',
                sourceKey: 'id_curso_fk'
            });
    };

    return curso_profesor;
};