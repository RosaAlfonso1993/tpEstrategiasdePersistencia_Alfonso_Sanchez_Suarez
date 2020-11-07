var express = require("express");
var router = express.Router();
var models = require("../models");

router.get("/", (req, res, next) => {
  const { page_number, page_size } = req.query;
  var off = null;
  var lim = null;

    if(page_number){
     off = (page_number-1)*page_size};
    if(page_size){
      lim = 1*page_size};
  
  models.profesor.findAll({
    offset: off,
    limit:  lim,
   // offset:1 ,limit:1,
    attributes: ["id", "nombre","apellido"],
    include: [{
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      },
      model: models.curso_profesor,
      include: [
        {
          attributes: {
            exclude: ["createdAt", "updatedAt","id_carrera"]
          },
          model: models.curso
        }
      ]
    }
    ]
  })
  .then(profesores => res.send(profesores)).catch(error => {
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
