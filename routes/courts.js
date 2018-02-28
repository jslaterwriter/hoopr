var express = require("express");
var router  = express.Router();
var passport = require("passport");
var Court = require("../models/court");
var middleware = require("../middleware");
var User = require("../models/user");

//INDEX 
//Show all courts
router.get("/", function(req, res){
    var notFound;
    if(req.query.search){
        //const regex = new RegExp(escapeRegex(req.query.search));
        Court.find({$text:{"$search": req.query.search}}, function(err, allCourts){
       if(err){
           console.log(err);
           return res.redirect("/");
       } else {
           
           if(allCourts.length < 1){
               notFound = "There are no courts found at that address";
               res.render("courts/index",{courts:allCourts, notFound:notFound});
           }
           res.render("courts/index",{courts:allCourts, notFound:notFound});
       }
    });
    } else {
    Court.find({}, function(err, allCourts){
       if(err){
           return res.redirect("/");
       } else {
           res.render("courts/index",{courts:allCourts, notFound:notFound});
       }
    });
    }
});



//NEW - show form to create new court
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("courts/new"); 
});

//CREATE - add new court to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to courts array
    // DON'T FORGET TO PASS THROUGH HOURS, ETC.
    var name = req.body.name;
    var desc = req.body.desc;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var hours = {
        open: {
          hour: req.body.hours.open.hour,
          minute: req.body.hours.open.minute,
          period: req.body.hours.open.period
        },
        close: {
          hour: req.body.hours.close.hour,
          minute: req.body.hours.close.minute,
          period: req.body.hours.close.period
        }
    };
    var address = req.body.address;    
    var image = req.body.image;
    
    var newCourt = {image:image, name: name,  desc: desc, author:author, hours:hours, address:address};
    // Create a new court and save to DB
    Court.create(newCourt, function(err, newlyCreated){
        if(err){
            return res.redirect("/");
        } else {
            //redirect back to courts page
            res.redirect("/courts");
        }
    });
});

//SHOW

router.get("/:id", function(req, res){
    //find the court with provided ID
    Court.findById(req.params.id).populate("comments").populate("games").exec(function(err, foundCourt){
        if(err || !foundCourt){
           res.redirect("back");
           } else {
            //render show template with that court
            res.render("courts/show", {court: foundCourt});
        }
    });
});

//EDIT 
router.get("/:id/edit", middleware.checkCourtOwnership, function(req, res){
    //find court by id
    Court.findById(req.params.id, function(err, foundCourt){
        if(err){
            return res.redirect("/");
        } else {
            //show edit form
            res.render("courts/edit", {court:foundCourt});
        }
    });
});

//UPDATE
router.put("/:id", middleware.checkCourtOwnership, function(req, res){
    //find and update court
    Court.findByIdAndUpdate(req.params.id, req.body.court, function(err, updatedCourt){
        if(err){
            res.redirect("/courts");
        } else {
            res.redirect("/courts/" + req.params.id);
        }
    });
    
});

//DESTROY court ROUTE
router.delete("/:id", middleware.checkCourtOwnership, function(req, res){
    //destroy court
    Court.findByIdAndRemove(req.params.id, function(err){
        //redirect
        if(err){
        res.redirect("/courts");
        } else {
            res.redirect("/courts");
        }
    });
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;