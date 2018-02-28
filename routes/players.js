var express = require("express"),
    router = express.Router({mergeParams:true}),
    Game = require("../models/game"),
    Player = require("../models/player"),
    User = require("../models/user"),
    middleware = require("../middleware");



//Add A Player 
router.post("/", middleware.isLoggedIn, function(req, res){
    //find game
    Game.findById(req.body.game, function(err, foundGame){
       
         if(err){
            req.flash("error", "Something went wrong.");  
      }  else {
          //create player
          User.create(req.user, function(err, player){
              if(err){
                  console.log(">>>> error" + player);
                  res.redirect("back");
              } else {
                  player.username = req.user.username;
                  player.id = req.user_id;
                  //test if player is in game
                  middleware.isInGroup(player, foundGame.players);
                  //test outcome
                  console.log(">>>>>>>>>>" + middleware.isInGroup(player, foundGame.players));
                  //add to game if outcome is false
                  if(!middleware.isInGroup(player, foundGame.players)){
                      foundGame.players.push(player);
                  }
                 
                  foundGame.save();
                  res.redirect("back");
              }
          });
        }
    });
});

//Remove a player
router.post("/leave", middleware.isLoggedIn, function(req, res){
    //find game
    Game.findById(req.body.game, function(err, foundGame){
       
         if(err){
            req.flash("error", "Something went wrong.");  
         }  else {
            middleware.leave(req.user, foundGame.players);
            foundGame.save();
            res.redirect("back");
        }
    });
});
    


module.exports = router;