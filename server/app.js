const dotenv = require("dotenv").config();
const dbConfig = require("./config/database.config.js");
const cors = require("cors");
const mongoose = require("mongoose");
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

//var indexRouter = require("./routes/index");
var usersRouter = require("./routes/userRoutes");
var courseRouter = require("./routes/courseRoutes");
var batchRouter = require("./routes/batchRoutes");
var applicationRouter = require("./routes/applicationRoutes");
var miscRouter = require("./routes/miscRoutes");

var app = express();
app.use(cors());

app.use("/", express.static(__dirname + "/public/html/"));
app.use("/pages/*", express.static(__dirname + "/public/html/"));
app.use("/backend/*", express.static(__dirname + "/public/html/"));
app.use("/secure/*", express.static(__dirname + "/public/html/"));

//initial db
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Db connected"))
  .catch((err) => console.log(err));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
//app.use(cors());

//app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/courses", courseRouter);
app.use("/batches", batchRouter);
app.use("/applications", applicationRouter);
app.use("/shared", miscRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
    err
  });

  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get("env") === "development" ? err : {};

  // // render the error page
  // res.status(err.status || 500);
  // res.render("error");
});

module.exports = app;

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`App listening on ${PORT} port`);
// });
