var express = require("express");
var router = express.Router();
var models = require("../models");
const alumno_carrera = require("../models/alumno_carrera");

router.get('/', (req, res) => {
    models.alumno_carrera
        .findAll()
        .then(alumnos_carreras => res.send
            (alumnos_carreras))
        .catch(
            (err) => {
                res.sendStatus(500)
                console.log(err)
            });
});

router.post('/', (req, res) => {
    models.alumno_carrera.create({
        id_carrera_fk: req.body.id_carrera_fk,
        id_alumno_fk: req.body.id_alumno_fk
    }).then(alumno_carrera => res.status(201).send
        (alumno_carrera)).
        catch((err) => {
            res.sendStatus(500)
            console.log(err)
        });
});


router.get('/:id', (req, res) => {
    const { id } = req.params
    models.alumno_carrera
        .findOne({
            where: {
                id
            }
        })
        .then(alumno_carrera => res.send(alumno_carrera))
        .catch((err) => {
            res.sendStatus(500)
            console.log(err)
        });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { id_carrera_fk, id_alumno_fk } = req.body;
    models.alumno_carrera
        .findOne({
            where: {
                id: req.params.id
            }
        })
        .then(data => {
            if (data) {
                data.update({
                    id_alumno_fk: req.body.id_alumno_fk,
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
    models.alumno_carrera
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