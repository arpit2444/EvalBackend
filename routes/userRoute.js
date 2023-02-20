const express = require("express");
const {UserModel} = require("../Model/userModel");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const userRouter = express.Router()



userRouter.post("/register",async(req,res)=>{
   const {name,email,gender,password,age,city} = req.body;
   const userPre= UserModel.find({email})
   if(userPre.length>0){
    res.send({"msg":"User already exist, please login"})
   }
   else{
   try{
    bcrypt.hash(password, 5, async(err, hash)=> {
        if(err){res.send("something went wrong")}
        else{const user = new UserModel({name,email,gender,password:hash,age,city})
             await user.save();
             res.send({"msg":"registered successfully"})
    }
    });

   }catch(err){res.send({"error":err.message})}}
})



userRouter.post("/login",async(req,res)=>{
const {email,password} = req.body;

try{
    const user = await UserModel.find({email})
    if(user.length>0){
        bcrypt.compare(password, user[0].password, async(err, result)=> {
            if(err){res.send(err)}
            else{
                const token= jwt.sign({ "user":user[0]._id }, 'masai');
                res.send({"msg":"logged in successfully","token":token})
            }
        });
    }else{res.send({"msg":"something went wrong"})}
}catch(err){res.send({"error":err.message})}

})


module.exports={
    userRouter
}