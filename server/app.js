var createError = require('http-errors');
var express = require('express');
var StudentData = require('./src/model/studentData');
var path = require('path');
const cors = require('cors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.post('/insert',function(req,res){
   
  console.log(req.body);
 
  var student = {       
      
      name : req.body.student.name,
      courseType : req.body.student.courseType,
      photo : req.body.student.photo,
      emailId : req.body.student.emailId,
      phoneno : req.body.student.phoneno,
      starRating : req.body.student.starRating,
      batch : req.body.student.batch,
      courseStartDate : req.body.student.courseStartDate,
      courseEndDate : req.body.student.courseEndDate,
 }       
 var student = new StudentData(student);
 student.save();
});

app.listen(3000, function(){
  console.log('listening to port 3000');
});

module.exports = app;
