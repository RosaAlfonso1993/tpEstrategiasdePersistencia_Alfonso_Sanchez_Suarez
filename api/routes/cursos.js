var express = require("express");
var router = express.Router();
var models = require("../models");

router.get("/", (req, res) => {
  const { page_number, page_size } = req.query;
    var off = null;
  var lim = null;

    if(page_number){
     off = (page_number-1)*page_size};
    if(page_size){
      lim = 1*page_size};
      
  models.curso
    .findAll({
    offset: off,
    limit:  lim,
      attributes:["id"],
      include: [{
        attributes: {
          exclude: ["createdAt", "updatedAt"]
      },
      model: models.curso_materia
      ,
        include:[
          {
            attributes:
              ["nombre"]
            ,
            model: models.materia
            
          }
        ]
      }]


    })
    .then(cursos => res.send(cursos))
    .catch((err) => {
      console.log(err);
      res.sendStatus(500)});
});

router.post("/", (req, res) => {
  models.curso
    .create({ capacidad: req.body.capacidad})
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
      attributes: ["id", "capacidad"],
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
      .update({ capacidad: req.body.capacidad }, 
      	{ fields: ["capacidad"] })
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
