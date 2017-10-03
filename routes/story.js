var mongoose  =  require("mongoose");
var Story  =  mongoose.model("Story");


exports.stories  =  function(req, res) {
    Story.find({}, function(err, stories) {
        res.render("home", {stories: stories, session: req.session});
    });
}

exports.addStory = function(req, res) {
    var newStory = new Story();
    newStory.author = req.session.username;
    newStory.title = req.body.title;
    newStory.content = req.body.content;
    newStory.summary = req.body.summary;
    newStory.imageLink = req.body.imageLink;

    console.log("Author is:" + newStory.author);

    newStory.slug = newStory.title.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, "").replace(/\s+/g, "-");

    newStory.save(function(err, savedStory) {
        if(err) {
            console.log("Error : While saving the story");
            return res.status(500).send();
        } else {
            res.redirect("/stories");
        }
    });
}

exports.getStory = function(req, res) {
    var url = req.params.story;
    Story.findOne({slug: url}, function(err, story) {
        res.render("story", {story:story, session:req.session});
    });
}

exports.saveComment = function(req, res) {
    Story.findOne({slug: req.params.slug}, function(err, story) {
        story.comments.push({body: req.body.comment, commented_by: req.session.username, date: new Date()});

        story.save(function(err, savedStory) {
            if(err) {
                console.log("Error : While saving comments");
                return res.status(500).send();
            } else  {
                res.render("story", {story: story, session:req.session});
            }
        });
    });
}
