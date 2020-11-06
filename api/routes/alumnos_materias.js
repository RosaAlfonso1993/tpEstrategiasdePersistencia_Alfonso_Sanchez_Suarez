var express = require("express");
var router = express.Router();
var models = require("../models");
const alumno_materia = require("../models/alumno_materia");

router.get('/', (req, res) => {
    models.alumno_materia
        .findAll()
        .then(alumnos_materias => res.send
            (alumnos_materias))
        .catch(
            (err) => {
                res.sendStatus(500)
                console.log(err)
            });
});

router.post('/', (req, res) => {
    models.alumno_materia.create({
        id_materia_fk: req.body.id_materia_fk,
        id_alumno_fk: req.body.id_alumno_fk
    }).then(alumno_materia => res.status(201).send
        (alumno_materia)).
        catch((err) => {
            res.sendStatus(500)
            console.log(err)
        });
});


const findAlumno_Materia = (id, { onSucces,
    onNotFound, onError }) => {
    models.alumno_materia
        .findOne({
            where: {
                id
            }
        })
        .then(carrera => (alumno_materia ? onSuccess(alumno_materia) : onNotFound()))
        .catch(() => onError());
};

router.get(':id', (req, res) => {
    findAlumno_Materia(req.params.id, {
        onSuccess: alumno_materia => res.send(alumno_materia),
        onNotFound: () => res.sendStatus(404),
        onError: () => res.sendStatus(500)
    })
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { id_materia_fk, id_alumno_fk } = req.body;
    models.alumno_materia
        .findOne({
            where: {
                id: req.params.id
            }
        })
        .then(data => { 
            if (data) {
                data.update({
                    id_alumno_fk: req.body.id_alumno_fk,
                    id_materia_fk: req.body.id_materia_fk
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
    models.alumno_materia
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