var express = require('express');
var router = express.Router();
var models = require("../models");

router.get('/', (req, res) => {
    models.curso_profesor
        .findAll()
        .then(curso_profesor => res.send(curso_profesor))
        .catch(
            (err) => {
            res.sendStatus(500)
            console.log(err)
        });
});

router.post('/', (req, res) => {
    models.curso_profesor.create({
        id_curso_fk: req.body.id_curso_fk,
        id_profesor_fk: req.body.id_profesor_fk
    }).then(curso_profesor => res.status(201).send(curso_profesor)).
        catch((err) => {
            res.sendStatus(500)
            console.log(err)
        });
});

router.get('/:id', (req, res) => {
    const { id } = req.params
    models.curso_profesor
        .findOne({
            where: {
                id
            }
        })
        .then(curso_profesor => res.send(curso_profesor))
        .catch((err) => {
            res.sendStatus(500)
            console.log(err)
        });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { id_curso_fk, id_profesor_fk } = req.body;
    models.curso_profesor
        .findOne({
            where: {
                id: req.params.id
            }
        })
        .then(data => { 
            if (data) {
                data.update({
                    id_curso_fk: req.body.id_curso_fk,
                    id_profesor_fk: req.body.id_profesor_fk
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
    models.curso_profesor
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