var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var carrerasRouter = require('./routes/carreras');
var materiasRouter = require('./routes/materias');
var profesoresRouter = require('./routes/profesores');
var materia_profesorRouter = require('./routes/materias_profesores');
var cursosRouter = require('./routes/cursos');
var institutosRouter = require('./routes/institutos');
var alumnosRouter = require('./routes/alumnos');
var transaccionalCarrera_MateriaRouter = require('./routes/transaccionalCarreras_Materias');
var alumnos_MateriaRouter = require('./routes/alumnos_materias');
var instituto_carrerasRouter = require('./routes/institutos_carreras');
var cursos_materiasRouter = require('./routes/cursos_materias')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/car', carrerasRouter);
app.use('/mat', materiasRouter);
app.use('/prof', profesoresRouter);
app.use('/mat_prof', materia_profesorRouter);
app.use('/ins',institutosRouter),
app.use('/cur', cursosRouter);
app.use('/alu', alumnosRouter);
app.use('/transCar_mat',transaccionalCarrera_MateriaRouter);
app.use('/alum_mat', alumnos_MateriaRouter);
app.use('/ins_car',instituto_carrerasRouter);
app.use('/cur_mat', cursos_materiasRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
