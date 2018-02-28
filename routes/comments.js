var express = require("express"),
    router = express.Router({mergeParams:true}),
    Court = require("../models/court"),
    Comment = require("../models/comments"),
    middleware = require("../middleware");


//Comments New    
router.get("/new", middleware.isLoggedIn, function(req, res){
    //find court
    Court.findById(req.params.id, function(err, court){
        if(err){
            req.flash("error", "Something went wrong.");
            res.redirect("/");
        } else {
            res.render("comments/new", {court: court});
        }
    });
});

//Comments Create
router.post("/", middleware.isLoggedIn, function(req, res){
    Court.findById(req.params.id, function(err, foundCourt){
        if(err){
        req.flash("error", "Something went wrong.");  
      }  else {
          Comment.create(req.body.comment, function(err, comment){
              if(err){
                  console.log(err);
              } else {
                  //add username and id
                  comment.author.id = req.user._id;
                  comment.author.username = req.user.username;
                  //save comment
                  comment.save();
                  foundCourt.comments.push(comment);
                  foundCourt.save();
                  //redirect
                  res.redirect("/courts/" + foundCourt._id);
                 
                }
            });
        }
    });
});

//Comments Edit
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
   //find court
    Court.findById(req.params.id, function(err, foundCourt){
        if(err || !foundCourt){
            req.flash("error", "Something went wrong.");
            return res.redirect("back");
        } else {
    //find comment        
   Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
          res.redirect("back");
      } else {
        res.render("comments/edit", {court_id: req.params.id, comment: foundComment});
      }
        });
       }
   });
});

//Update Route
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    //find comment
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/courts/" + req.params.id);
        }
    });
});

//DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            req.flash("success", "Comment deleted.")
            res.redirect("/courts/" + req.params.id);
        }
    });
});

module.exports = router;