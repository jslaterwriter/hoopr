var mongoose = require("mongoose");

var playerSchema = new mongoose.Schema({
   
        id:{type:mongoose.Schema.Types.ObjectId,
        ref:"User" 
        },
        username: String
    
});

module.exports = mongoose.model("Player", playerSchema);