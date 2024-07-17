const mongoose =require('mongoose');
const authSchema = mongoose.Schema({
    username:{
        type:String,
    },
    email:{
   type: String,
   required: true,

    },
 password:{
    type:String,
    required:true,
 }


});
const authModel=mongoose.model("users",authSchema);
module.exports=authModel;