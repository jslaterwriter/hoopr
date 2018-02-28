//all middleware
var middlewareObj = {}, 
    Court = require("../models/court"),
    Game = require("../models/game"),
    Comment = require("../models/comments");
    
middlewareObj.checkCourtOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        //find court
        Court.findById(req.params.id, function(err, foundCourt){
            if(err || !foundCourt){
                req.flash("error", "Court Not Found");
                req.redirect("/courts");
            } else {
                //verify court ownership
                if(foundCourt.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that.")
                    res.redirect("back");
                }
            } 
        });
    } else {
        req.flash("error", "Please Login First");
        res.redirect("/login");
    }
};

middlewareObj.checkCommentOwnership = function(req,res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err || !foundComment){
                req.flash("error", "Comment not found.");
                res.redirect("back");
            } else {
                //does user own campground
                if (foundComment.author.id.equals(req.user._id)){
                    next();   
                } else {
                    req.flash("error", "You don't have permission to do that.")
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "Please Login First!");
        res.redirect("/login");
    }
};


middlewareObj.checkGameOwnership = function(req,res, next){
    if(req.isAuthenticated()){
        Game.findById(req.params.game_id, function(err, foundGame){
            console.log(">>>>" + foundGame);
            console.log(">>>>>" + foundGame.author.id);
            console.log(">>>>>>" + req.user._id);
            if(err || !foundGame){
                req.flash("error", "Game not found.");
                res.redirect("back");
            } else {
                //does user own campground
                if (foundGame.author.id.equals(req.user._id)){
                    next();   
                } else {
                    req.flash("error", "You don't have permission to do that.");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "Please Login First!");
        res.redirect("/login");
    }
};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash("error", "Please Login First!");
        res.redirect("/login");
    }
};




middlewareObj.isInGroup = function(user, arr){
   if(!arr[0]){
       arr.push(user);
       console.log("array empty");
   }
    for(var i=0; i < arr.length; i++) {
        if(JSON.stringify(arr[i]._id) === JSON.stringify(user._id)) {
        return true;
        } 
    } 
};


middlewareObj.leave = function remove(element, array) {
    const index = array.indexOf(JSON.stringify(element));
    console.log(index);
    array.splice(index, 1);
    
};
   


module.exports = middlewareObj;