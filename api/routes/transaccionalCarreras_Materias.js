var express = require('express');
var router = express.Router();
var models = require("../models");

router.get('/', (req, res) => {
    models.transaccionCarrera_Materia
        .findAll()
        .then(transaccionalCarrera_Materias => res.send(transaccionalCarrera_Materias))
        .catch(
            (err) => {
                res.sendStatus(500)
                console.log(err)
            });
});

router.post('/', (req, res) => {
    models.transaccionCarrera_Materia.create({
        id_materia_fk: req.body.id_materia_fk,
        id_carrera_fk: req.body.id_carrera_fk
    }).then(transaccionalCarrera_Materias => res.status(201).send(transaccionalCarrera_Materias)).
        catch((err) => {
            res.sendStatus(500)
            console.log(err)
        });
});

router.get('/:id', (req, res) => {
    const { id } = req.params
    models.transaccionCarrera_Materia
        .findOne({
            where: {
                id
            }
        })
        .then(transaccionalCarrera_Materias => res.send(transaccionalCarrera_Materias))
        .catch((err) => {
            res.sendStatus(500)
            console.log(err)
        });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { id_materia_fk, id_carrera_fk } = req.body;
    models.transaccionalCarrera_Materia
        .findOne({
            where: {
                id: req.params.id
            }
        })
        .then(data => {
            if (data) {
                data.update({
                    id_materia_fk: req.body.id_materia_fk,
                    id_carrera_fk: req.body.id_carrera_fk
                }).then(data => res.send(data))
                    .catch((err) => {
                        res.sendStatus(500)
                        console.log(err)
                    });
            }
        })
        .catch((err) => {
            res.sendStatus(500)
            console.log(err)
        });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    models.transaccionalCarrera_Materia
        .findOne({
            where: {
                id
            }
        })
        .then(data => {
            if (data) {
                data.destroy({
                    where: {
                        id
                    }
                }).then(data => res.status(200))
                    .catch((err) => {
                        res.sendStatus(500)
                        console.log(err)
                    });
            }
        })
        .catch((err) => {
            res.sendStatus(500)
            console.log(err)
        });
});





module.exports = router;