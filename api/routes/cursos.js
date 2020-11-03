var express = require("express");
var router = express.Router();
var models = require("../models");

router.get("/", (req, res) => {
  console.log("Esto es un mensaje para ver en consola");
  models.curso
    .findAll({
      attributes: ["id", "capacidad","id_materia_fk"]
    })
    .then(cursos => res.send(cursos))
    .catch(() => res.sendStatus(500));
});

router.post("/", (req, res) => {
  models.curso
    .create({ capacidad: req.body.capacidad ,id_materia_fk: req.body.id_materia_fk})
    .then(curso => res.status(201).send({ id: curso.id }))
    .catch(error => {
      if (error == "SequelizeUniqueConstraintError: Validation error") {
        res.status(400).send('Bad request: existe otra curso con el mismo capacidad')
      }
      else {
        console.log(`Error al intentar insertar en la base de datos: ${error}`)
        res.sendStatus(500)
      }
    });
});

const findcurso = (id, { onSuccess, onNotFound, onError }) => {
  models.curso
    .findOne({
      attributes: ["id", "capacidad", "id_materia_fk"],
      where: { id }
    })
    .then(curso => (curso ? onSuccess(curso) : onNotFound()))
    .catch(() => onError());
};

router.get("/:id", (req, res) => {
  findcurso(req.params.id, {
    onSuccess: curso => res.send(curso),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.put("/:id", (req, res) => {
  const onSuccess = curso =>
    curso
      .update({ capacidad: req.body.capacidad, id_materia_fk: req.body.id_materia_fk }, 
      	{ fields: ["capacidad","id_materia_fk"] })
      .then(() => res.sendStatus(200))
      .catch(error => {
        if (error == "SequelizeUniqueConstraintError: Validation error") {
          res.status(400).send('Bad request: existe otra curso con el mismo capacidad')
        }
        else {
          console.log(`Error al intentar actualizar la base de datos: ${error}`)
          res.sendStatus(500)
        }
      });
    findcurso(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.delete("/:id", (req, res) => {
  const onSuccess = curso =>
    curso
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  findcurso(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});


module.exports = router;
