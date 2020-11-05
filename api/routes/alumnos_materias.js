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

// router.get('/:id', (req, res) => {
//     const { id } = req.params
//     models.alumno_materia
//         .findOne({
//             where: {
//                 id
//             }
//         })
//         .then(alumno_materia => res.send
//             (alumno_materia))
//         .catch((err) => {
//             res.sendStatus(500)
//             console.log(err)
//         });
// });



module.exports = router;