var express = require('express');
var router = express.Router();
var models = require("../models");

router.get('/', (req, res) => {
    models.instituto_carrera
        .findAll()
        .then(instituto_carrera => res.send(instituto_carrera))
        .catch(
            (err) => {
                res.sendStatus(500)
                console.log(err)
            });
});

router.post('/', (req, res) => {
    models.instituto_carrera.create({
        id_instituto_fk: req.body.id_instituto_fk,
        id_carrera_fk: req.body.id_carrera_fk
    }).then(instituto_carrera => res.status(201).send(instituto_carrera)).
        catch((err) => {
            res.sendStatus(500)
            console.log(err)
        });
});

router.get('/:id', (req, res) => {
    const { id } = req.params
    models.instituto_carrera
        .findOne({
            where: {
                id
            }
        })
        .then(instituto_carrera => res.send(instituto_carrera))
        .catch((err) => {
            res.sendStatus(500)
            console.log(err)
        });
    });

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { id_instituto_fk, id_carrera_fk } = req.body;
    models.instituto_carrera
        .findOne({
            where: {
                id: req.params.id
            }
        })
        .then(data => {
            if (data) {
                data.update({
                    id_instituto_fk: req.body.id_instituto_fk,
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
    models.instituto_carrera
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


