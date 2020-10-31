var express = require("express");
var router = express.Router();
var models = require("../models");

router.get("/", (req, res, next) => {
  models.profesor.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"]
    },
    /////////se agrega la asociacion 
    include: [
      {
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        },
        model: models.materia_profesor,
        include: [
          {
            attributes: {
              exclude: ["createdAt", "updatedAt"]
            },
            model: models.materia
          }
        ]
      }
    ]
  }).then(profesores => res.send(profesores)).catch(error => {
    console.log(error)
    return next(error)
  });
});



router.post("/", (req, res) => {
  models.profesor
    .create({ nombre: req.body.nombre, apellido: req.body.apellido })
    .then(profesor => res.status(201).send({ id: profesor.id }))
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

const findProfesor = (id, { onSuccess, onNotFound, onError }) => {
  models.profesor
    .findOne({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      },
      include: [
        {
          attributes: {
            exclude: ["createdAt", "updatedAt"]
          },
          model: models.materia_profesor,
          include: [
            {
              attributes: {
                exclude: ["createdAt", "updatedAt"]
              },
              model: models.materia
            }
          ]
        }
      ]
    })
    .then(profesor => (profesor ? onSuccess(profesor) : onNotFound()))
    .catch((error) => {
      console.log(error)
      onError()
    });
};

router.get("/:id", (req, res) => {
  findProfesor(req.params.id, {
    onSuccess: profesor => res.send(profesor),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.put("/:id", (req, res) => {
  const onSuccess = profesor =>
    profesor
      .update({ nombre: req.body.nombre, apellido: req.body.apellido },
        { fields: ["nombre", "apellido"] })
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
  findProfesor(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.delete("/:id", (req, res) => {
  const onSuccess = profesor =>
    profesor
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  findProfesor(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});


module.exports = router;
