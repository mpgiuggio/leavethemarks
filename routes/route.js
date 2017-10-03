var mongoose = require("mongoose");
var Story = mongoose.model("Story");

exports.index = function(req, res) {
	res.render("index", {session: req.session});
}

exports.login = function(req, res) {
	res.render("login");
}

exports.register = function(req, res) {
	res.render("register");
}

exports.techStack = function(req, res) {
	res.render("tech-stack", {session: req.session});
}

exports.home = function(req, res) {
	Story.find({}, function(err, stories) {
		res.render("home",  {stories: stories});
	});
}

exports.newStory = function(req, res) {
	if(req.session.loggedIn !== true) {
		console.log("Logged In:" + req.session.loggedIn);
		res.redirect("/login");
	} else {
	  	res.render("new-story", {session: req.session});
	}
}
