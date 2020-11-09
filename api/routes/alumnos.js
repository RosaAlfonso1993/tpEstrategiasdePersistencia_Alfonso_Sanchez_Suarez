var express = require("express");
var router = express.Router();
var models = require("../models");


router.get("/", (req, res) => {
  var off = null;
  var lim = null;

  const { page_number, page_size } = req.query;
  if(page_number){
     off = (page_number-1)*page_size};
  if(page_size){
      lim = 1*page_size};

  models.alumno
    .findAll({
    offset: off,
    limit:  lim,

      attributes: ["id", "nombre", "apellido"],
      include: [{
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        },
        model: models.alumno_materia,
        include: [
          {
            attributes: {
              exclude: ["createdAt", "updatesAt", "id_carrera"]
            },
            model: models.materia
          }
        ]
      },
      {
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        },
        model: models.alumno_carrera,
        include: [
          {
            attributes: {
              exclude: ["createdAt", "updatesAt"]
            },
            model: models.carrera
          }
        ]
      }
      ]
    })
    .then(alumnos => res.send(alumnos))
    .catch(() => res.sendStatus(500));
});

router.post("/", (req, res) => {
  models.alumno
    .create({ nombre: req.body.nombre, apellido: req.body.apellido })
    .then(alumno => res.status(201).send({ id: alumno.id }))
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

const findalumno = (id, { onSuccess, onNotFound, onError }) => {
  models.alumno
    .findOne({
      attributes: ["id", "nombre", "apellido"],
      include: [{
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        },
        model: models.alumno_materia,
        include: [
          {
            attributes: {
              exclude: ["createdAt", "updatesAt", "id_carrera"]
            },
            model: models.materia
          }
        ]
      },
      {
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        },
        model: models.alumno_carrera,
        include: [
          {
            attributes: {
              exclude: ["createdAt", "updatesAt"]
            },
            model: models.carrera
          }
        ]
      }
      ],
      where: { id }
    })
    .then(alumno => (alumno ? onSuccess(alumno) : onNotFound()))
    .catch(() => onError());
};

router.get("/:id", (req, res) => {
  findalumno(req.params.id, {
    onSuccess: alumno => res.send(alumno),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.put("/:id", (req, res) => {
  const onSuccess = alumno =>
    alumno
      .update({ nombre: req.body.nombre, apellido: req.body.apellido }, { fields: ["nombre", "apellido"] })
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
  findalumno(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.delete("/:id", (req, res) => {
  const onSuccess = alumno =>
    alumno
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  findalumno(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

module.exports = router;
