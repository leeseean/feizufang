var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session = require("express-session");
const { checkLogin } = require("./routes/middleware");
var indexRouter = require("./routes/index");
var detailRouter = require("./routes/detail");
var postRouter = require("./routes/post");
var userRouter = require("./routes/user");
var rentsRouter = require("./routes/rents");
var app = express();
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// 配置会话中间件
app.use(
  session({
    secret: "mysecretkey", // 用于加密会话数据的密钥，请根据实际情况进行更改
    resave: false, // true每次刷新页面都会重新设置会话的过期时间
    saveUninitialized: true,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 过期时间为30天
  }),
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(checkLogin);

app.get("/", (req, res) => {
  res.redirect("/index");
});
app.use("/index", indexRouter);
app.use("/detail", detailRouter);
app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/rents", rentsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
require("./utils/crawl");
module.exports = app;
