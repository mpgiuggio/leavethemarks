var mongoose = require("mongoose");
var User = mongoose.model("User");

exports.registrationSuccessful = function(req, res) {
    res.render("new-user");
}

exports.login = function(req, res) {
    User.findOne( {email: req.body.email}, function(err, user) {
        console.log("User: " + user);
        if(user == null) {
            console.log("User is null redirecting to login");
            var message = "Invalid email or password";
            console.log("Message:" + message);
            res.render("login",  {errorMessage: message});
            return;
        }

        user.comparePassword(req.body.password, function(err, isMatch) {
            if(isMatch && isMatch == true) {
                console.log("Authentication Sucessfull");
                req.session.username = user.username;
                req.session.loggedIn = true;
                console.log("Got User: " + req.session.username);
                res.render("new-story", {session: req.session});
            } else {
                console.log("Authentication UnSucessfull");
                var message = "Invalid email or password";
                console.log("Message:" + message);
                res.render("login",  {errorMessage: message});
                return;
            }
        });
    });
}

exports.logout = function(req, res) {
    console.log("Logging  Out:" + req.session.username);
    var loggedOutUser = req.session.username;
    req.session.destroy();
    console.log("Logged Out:" + loggedOutUser);
    res.render("logout", {loggedOutUser: loggedOutUser, session: undefined });
}

exports.doCreate = function(req, res) {
    var newuser = new User();
    newuser.username = req.body.username;;
    newuser.email = req.body.email;
    newuser.password = req.body.password;

    newuser.save(function(err, savedUser) {
        if(err) {
            console.log("User already exists with that username or email");
            var message = "A user already exists with that username or email";
            res.render("register", {errorMessage: message});
            return;
        } else {
            //req.session.newuser = savedUser.username;
            req.session.username = savedUser.username;
            req.session.loggedIn = true;
            console.log("Logged in user: " + req.session.username);
            res.render("new-user", {session: req.session});
       }
   });
}