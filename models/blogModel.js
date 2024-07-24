const mongoose =require('mongoose');
const blogSchema = mongoose.Schema({
    title:{
        type:String,
    },
    category:{
   type: mongoose.Schema.Types.ObjectId,
  refer:"categories"

    },
 description:{
    type:String,
    
 },
 thumbnil:{
    type:String,
 },
 user:{
    type: mongoose.Schema.Types.ObjectId,
    refer:"users"
 },
 date_and_time: {
   type: Date,
   default: Date.now  // Default value is the current date and time
}


});
const blogModel=mongoose.model("blogs",blogSchema);
module.exports=blogModel;