var mongoose = require("mongoose");

var gameSchema = new mongoose.Schema({
    name:String,
    author:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String,
    },
    court:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Court"
        },
        name:String,
    },
    players:[
        {
            id:{    type:mongoose.Schema.Types.ObjectId,
            ref:"Player",
            },
            username:String
            }
        
        
    ],
    time:{
        start:{
                  hour:Number,
                  minute:Number,
                  period:String,
              },
              
        end:{
                  hour:Number,
                  minute:Number,
                  period:String
              },
        },
    date:{
        day: Number,
        month: Number,
        year: Number
    }
    
});

module.exports = mongoose.model("Game", gameSchema);