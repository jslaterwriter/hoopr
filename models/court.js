var mongoose = require("mongoose");
    

var courtSchema = new mongoose.Schema({
    image: String,
    name:String,
    desc:String,
    author: {
        id:{
         type: mongoose.Schema.Types.ObjectId,
         ref:"User"
      },
      username:String
    },
    hours: {
        open: {
                  hour:Number,
                  minute:Number,
                  period:String,
              },
        close:{
                  hour:Number,
                  minute:Number,
                  period:String,
              },
        },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
        ],
    games:[ 
        {
           type:mongoose.Schema.Types.ObjectId,
           ref:"Game"
        }
        ],
    
    address:{
        street: String,
        city: String,
        state: String,
        zip:Number
    },
    days: String, 
    
    
    
        
    
});

module.exports = mongoose.model("Court", courtSchema);