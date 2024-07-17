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
 }


});
const blogModel=mongoose.model("blogs",blogSchema);
module.exports=blogModel;