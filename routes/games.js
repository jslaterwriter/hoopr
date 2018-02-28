var express = require("express"),
    router = express.Router({mergeParams:true}),
    Game = require("../models/game"),
    Court = require("../models/court"),
    Player = require("../models/player"),
    middleware = require("../middleware");

//show games
router.get("/", function(req, res){
    //find the court 
    Court.findById(req.params.id).populate("games").exec(function(err, foundCourt){
        if(err || !foundCourt){
           res.redirect("back");
           } else {
            //render show template
            res.render("games/index", {court: foundCourt});
        }
    });
});

//new game
router.get("/new", middleware.isLoggedIn, function(req, res){
    //find court by id
    Court.findById(req.params.id, function(err, court){
        if(err){
            req.flash("error", "Something went wrong.");
            res.redirect("/");
        } else {
            console.log(">>> court._id GET " + court._id);
            res.render("games/new", {court: court});
        }
    });
});

//create game
router.post("/",  middleware.isLoggedIn, function(req, res){
    //find court
    Court.findById(req.params.id, function(err, foundCourt){
        console.log(">>> pre-error" + foundCourt);
        if(err){
            console.log(">>>> post-error" + foundCourt);
        req.flash("error", "Something went wrong.");  
      }  else {
          //create game 
          Game.create(req.body.game, function(err, game){
              if(err){
                  console.log("post-else >>>>" + foundCourt);
                  console.log(err);
              } else {
                  //add username and id
                  game.court.name = foundCourt.name;
                  game.court.id = foundCourt._id;
                  game.author.id = req.user._id;
                  game.author.username = req.user.username;
                  Player.create(req.user, function(err, createdPlayer){
                      if(err){
                          console.log(err);
                      } else {   
                          createdPlayer.id = req.user._id;
                          createdPlayer.username = req.user.username;
                          game.players.push(createdPlayer);
                          //save game
                          game.save();
                          foundCourt.games.push(game);
                          foundCourt.save();
                          
                          //redirect
                          res.redirect("/courts/" + foundCourt._id);
                      }
                      
                  });
                }
            });
        }
    });
});

//edit route
router.get("/:game_id/edit", middleware.checkGameOwnership, function(req, res){
   //find court
    Court.findById(req.params.id, function(err, foundCourt){
        if(err || !foundCourt){
            req.flash("error", "Something went wrong.");
            return res.redirect("back");
        } else {
    //find comment        
   Game.findById(req.params.game_id, function(err, foundGame){
      if(err){
          res.redirect("back");
      } else {
        res.render("games/edit", {court: foundCourt, game: foundGame});
      }
        });
       }
   });
});

//update route
router.put("/:game_id",  middleware.checkGameOwnership, function(req, res){
    //find game
    Game.findByIdAndUpdate(req.params.game_id, req.body.game, function(err, updatedGame){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/courts/" + req.params.id);
        }
    });
});
    
//destroy route
router.delete("/:game_id",  middleware.checkGameOwnership, function(req,res){
    Game.findByIdAndRemove(req.params.game_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            req.flash("success", "Game deleted.");
            res.redirect("/courts/" + req.params.id);
        }
    });
});


module.exports = router;