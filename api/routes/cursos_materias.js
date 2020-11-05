var express = require('express');
var router = express.Router();
var models = require("../models");

router.get('/', (req, res) => {
    models.cursos_materias
        .findAll()
        .then(curso_materia => res.send(curso_materia))
        .catch(
            (err) => {
            res.sendStatus(500)
            console.log(err)
        });
});

router.post('/', (req, res) => {
    models.cursos_materias.create({
        id_materia_fk: req.body.id_materia_fk,
        id_curso_fk: req.body.id_curso_fk
    }).then(curso_materia => res.status(201).send(curso_materia)).
        catch((err) => {
            res.sendStatus(500)
            console.log(err)
        });
});

router.get('/:id', (req, res) => {
    const { id } = req.params
    models.cursos_materias
        .findOne({
            where: {
                id
            }
        })
        .then(curso_materia => res.send(curso_materia))
        .catch((err) => {
            res.sendStatus(500)
            console.log(err)
        });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { id_materia_fk, id_curso_fk } = req.body;
    models.cursos_materias
        .findOne({
            where: {
                id: req.params.id
            }
        })
        .then(data => { 
            if (data) {
                data.update({
                    id_materia_fk: req.body.id_materia_fk,
                    id_curso_fk: req.body.id_curso_fk
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
    models.cursos_materias
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