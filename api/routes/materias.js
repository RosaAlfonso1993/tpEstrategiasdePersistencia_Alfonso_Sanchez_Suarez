var express = require("express");
var router = express.Router();
var models = require("../models");

router.get("/", (req, res, next) => {
  models.materia.findAll({
    attributes: {exclude: ["createdAt", "updatedAt", "id_carrera"]},
    // include: [{
    //   model: models.carrera, attributes: ["id", "nombre"]
    // },

    include: [{
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      },
      model: models.materia_profesor,
      include: [
        {
          attributes: {
            exclude: ["createdAt", "updatedAt"]
          },
          model: models.profesor
        }
      ]
    }
    ],
    include:[{
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      },
      model: models.alumno_materia,
      include: [
        {
          attributes: {
            exclude: ["createdAt", "updatedAt", "id_materia"]
          },
          model: models.alumno
        }
      ]
    }]
  }).then(materias => res.send(materias)).catch(error => {
    console.log(error)
    return next(error)
  });
});



router.post("/", (req, res) => {
  models.materia
    .create({ nombre: req.body.nombre })
    .then(materia => res.status(201).send({ id: materia.id }))
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

const findMateria = (id, { onSuccess, onNotFound, onError }) => {
  models.materia
    .findOne({
      where: { id },
      attributes: ["id", "nombre"],
      include: [
       //{ as: 'Carrera-Relacionada', model: models.carrera, attributes: ["id", "nombre"] },
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
              model: models.profesor
            }
          ]
        }
      ]
    })
    .then(materia => (materia ? onSuccess(materia) : onNotFound()))
    .catch(() =>
      onError());
};

router.get("/:id", (req, res) => {
  findMateria(req.params.id, {
    onSuccess: materia => res.send(materia),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.put("/:id", (req, res) => {
  const onSuccess = materia =>
    materia
      .update({ nombre: req.body.nombre}, { fields: ["nombre"] })
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
  findMateria(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.delete("/:id", (req, res) => {
  const onSuccess = materia =>
    materia
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  findMateria(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});


module.exports = router;
