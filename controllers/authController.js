const authModel = require('../models/authModel.js');
const bcryptjs = require('bcryptjs');
const   jwt =require('jsonwebtoken');

class AuthController {
    static userRegistration = async (req, res) => {
      const {username, email,password}=req.body;
      try{
if(username && email && password){

    const isUser=await authModel.findOne({email: email});
    if(!isUser){
        // password hashing 
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        
// save a use
const newUser  = new authModel({
    username:username,
    email:email,
    password:hashedPassword
}

)

const savedUser=await newUser.save();
if(savedUser){ res.status(200).json({message: "User Registration successfully "});}


    }
    else{
        res.status(400).json({message: "already registered  email id"});

    }

}
else{
    res.status(400).json({message: "all fields are required"});
}



      }catch(error){
        res.status(500).json({message: error.message});
      }


    }

    static userLogin = async (req, res) => {
       const {email, password}=req.body;

try{
    if( email && password){
    const isEmail =await authModel.findOne({email: email});
    if(isEmail){
if( isEmail.email===email && await bcryptjs.compare(password, isEmail.password)){
 // generating token for the user

const token=jwt.sign({userID: isEmail._id},"ZindigiGulzarHai",{expiresIn: "2d",});

return res.status(200).json({
    message: "User Login successfully",
token,
name:isEmail.username,
});







}
else{
    res.status(400).json({message: "wrong Credentials"});
}


        
    }


else{
    res.status(400).json({message: "Email ID not found"});
}


    }
    else{
        res.status(400).json({message: "all fields are required"});
    }


}catch(error){
    res.status(500).json({message: error.message});

}











    }
}

module.exports = AuthController;
