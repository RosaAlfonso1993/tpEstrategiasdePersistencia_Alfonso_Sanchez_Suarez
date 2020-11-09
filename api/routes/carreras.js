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

  models.carrera
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
              exclude: ["createdAt", "updatedAt"]
            },
            model: models.instituto
          }
        ]
      },
      {
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        },
        model: models.transaccionCarrera_Materia,
        include: [{
          attributes: {
            exclude: ["createdAt", "updatedAt"]
          },
          model: models.materia
        }
        ]
      }
      ]
    })
    .then(carreras => res.send(carreras))
    .catch(() => res.sendStatus(500));
});

router.post("/", (req, res) => {
  models.carrera
    .create({ nombre: req.body.nombre })
    .then(carrera => res.status(201).send({ id: carrera.id }))
    .catch(error => {
      if (error == "SequelizeUniqueConstraintError: Validation error") {
        res.status(400).send('Bad request: existe otra carrera con el mismo nombre')
      }
      else {
        console.log(`Error al intentar insertar en la base de datos: ${error}`)
        res.sendStatus(500)
      }
    });
});

const findCarrera = (id, { onSuccess, onNotFound, onError }) => {
  models.carrera
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
            model: models.instituto
          }
        ]
      }],
      where: { id }
    })
    .then(carrera => (carrera ? onSuccess(carrera) : onNotFound()))
    .catch(() => onError());
};

router.get("/:id", (req, res) => {
  findCarrera(req.params.id, {
    onSuccess: carrera => res.send(carrera),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.put("/:id", (req, res) => {
  const onSuccess = carrera =>
    carrera
      .update({ nombre: req.body.nombre }, { fields: ["nombre"] })
      .then(() => res.sendStatus(200))
      .catch(error => {
        if (error == "SequelizeUniqueConstraintError: Validation error") {
          res.status(400).send('Bad request: existe otra carrera con el mismo nombre')
        }
        else {
          console.log(`Error al intentar actualizar la base de datos: ${error}`)
          res.sendStatus(500)
        }
      });
  findCarrera(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.delete("/:id", (req, res) => {
  const onSuccess = carrera =>
    carrera
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  findCarrera(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

module.exports = router;
