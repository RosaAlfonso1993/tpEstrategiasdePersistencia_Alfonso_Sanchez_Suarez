var express = require("express");
var router = express.Router();
var models = require("../models");
const instituto = require("../models/instituto");

router.get("/", (req, res) => {
  console.log("Esto es un mensaje para ver en consola");
  models.instituto
    .findAll({
      attributes: ["id", "nombre","direccion"]
    })
    .then(instituto => res.send(instituto))
    .catch(() => res.sendStatus(500));
});

router.post("/", (req, res) => {
  models.instituto
    .create({ nombre: req.body.nombre ,direccion: req.body.direccion})
    .then(instituto => res.status(201).send({ id: instituto.id }))
    .catch(error => {
      if (error == "SequelizeUniqueConstraintError: Validation error") {
        res.status(400).send('Bad request: existe otra alumno con el mismo nombre')
      }
      else {
        console.log(`Error al intentar insertar en la base de datos: ${error}`)
        res.sendStatus(500)
      }
    });
});

const findinstituto = (id, { onSuccess, onNotFound, onError }) => {
  models.instituto
    .findOne({
      attributes: ["id", "nombre","direccion"],
      where: { id }
    })
    .then(instituto => (instituto ? onSuccess(instituto) : onNotFound()))
    .catch(() => onError());
};

router.get("/:id", (req, res) => {
  findinstituto(req.params.id, {
    onSuccess: instituto => res.send(instituto),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.put("/:id", (req, res) => {
  const onSuccess = instituto =>
    instituto
      .update({ nombre: req.body.nombre, direccion: req.body.direccion }, { fields: ["nombre", "direccion"] })
      .then(() => res.sendStatus(200))
      .catch(error => {
        if (error == "SequelizeUniqueConstraintError: Validation error") {
          res.status(400).send('Bad request: existe otra alumno con el mismo nombre')
        }
        else {
          console.log(`Error al intentar actualizar la base de datos: ${error}`)
          res.sendStatus(500)
        }
      });
    findinstituto(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.delete("/:id", (req, res) => {
  const onSuccess = instituto =>
    instituto
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  findinstituto(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

module.exports = router;
