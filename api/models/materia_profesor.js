'use strict';
module.exports = (sequelize, DataTypes) => {
    const materia_profesor = sequelize.define('materia_profesor', {
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
        }
    }, {});

    materia_profesor.associate = function (models) {
        // associations can be defined here
        materia_profesor.hasOne(models.profesor
            , {
                //as : 'Materia-Relacionada',  
                foreignKey: 'id',
                sourceKey: 'id_profesor_fk'
            });
        materia_profesor.hasOne(models.materia
            , {
                //as : 'Materia-Relacionada',  
                foreignKey: 'id',
                sourceKey: 'id_materia_fk'
            });
    };

    return materia_profesor;
};