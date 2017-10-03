var express = require("express");
var chalk = require("chalk");
var mongoose = require("mongoose");
var session = require("express-session");
var bodyParser = require("body-parser");
//var cookieParser = require("cookie-parser");

var db = require("./models/db.js");
var routes = require("./routes/route.js");
var user = require("./routes/user.js");
var story = require("./routes/story.js");

var app = express();
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({secret:"qazwsxedcrfvtgbyhnujm", resave: true, saveUninitialized: true}));
//app.use(cookieParser());

app.get("/", routes.index);
app.get("/stories", story.stories);
app.get("/register", routes.register);
app.get("/registrationSuccessful", user.registrationSuccessful);
app.get("/login", routes.login);
app.get("/new-story", routes.newStory);
app.get("/stories/:story", story.getStory);
app.get("/tech-stack", routes.techStack);
app.get("/logout",user.logout);

app.post("/new-user", user.doCreate);
app.post("/stories/:slug/saveComment", story.saveComment);
app.post("/add-story", story.addStory);
app.post("/authenticate", user.login);

app.use(function(req, res) {
    console.log(chalk.yellow("Error: 404"));
    res.status(404).render("404", {session: req.session});
});

app.use(function(error, req, res, next) {
    console.log(chalk.red("Error: 500" + error));
    res.status(500).render("500", {session: req.session});
});

var port  =  process.env.PORT || 8080;

var server = app.listen(port,function(req, res){
    console.log(chalk.green("Server live at http://localhost:" + port));
});
