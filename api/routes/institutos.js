var express = require("express");
var router = express.Router();
var models = require("../models");


router.get("/", (req, res) => {
  var off = null;
  var lim = null;

  const { page_number, page_size } = req.query;

  if (page_number) {
    off = (page_number - 1) * page_size
  };
  if (page_size) {
    lim = 1 * page_size
  };

  models.instituto
    .findAll({
      offset: off,
      limit: lim,

      attributes: ["id", "nombre"],
      include: [{
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        },
        model: models.instituto_carrera,
        include: [
          {
            attributes: {
              exclude: ["createdAt", "updatesAt", "id_carrera"]
            },
            model: models.carrera
          }
        ]
      }]
    })
  .then(institutos => res.send(institutos))
  .catch((error) =>
    console.log(error),
    res.sendStatus(500));
});

router.post("/", (req, res) => {
  models.instituto
    .create({ nombre: req.body.nombre })
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
      attributes: ["id", "nombre"],
      include: [{
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        },
        model: models.instituto_carrera,
        include: [
          {
            attributes: {
              exclude: ["createdAt", "updatesAt", "id_carrera"]
            },
            model: models.carrera
          }
        ]
      }],
      where: { id },
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
      .update({ nombre: req.body.nombre }, { fields: ["nombre"] })
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
