'use strict';
module.exports = (sequelize, DataTypes) => {
    const transaccionalCarrera_Materia = sequelize.define('transaccionCarrera_Materia', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_carrera_fk: {
            type: DataTypes.INTEGER,
            foreignKey: true
        },
        id_materia_fk: {
            type: DataTypes.INTEGER,
            foreignKey: true
        }
    }, {});
    transaccionalCarrera_Materia.associate = function (models) {
        transaccionalCarrera_Materia.hasOne(models.materia, {  
                foreignKey: 'id',
                sourceKey: 'id_materia_fk'
            });
        transaccionalCarrera_Materia.hasOne(models.carrera,{   
                foreignKey: 'id',
                sourceKey: 'id_carrera_fk'
            });
    }

  return transaccionalCarrera_Materia;
}