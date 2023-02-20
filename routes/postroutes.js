const express = require("express");
const {PostModel} = require("../Model/postModel")
const postRouter = express.Router()



postRouter.get("/",async(req,res)=>{
    const query = req.query;
    const device = query.device 
    const device1 = query.device1
    const device2= query.device2

    try{
    const post = await PostModel.find({$and:{device:device,device:device1,device:device2}})
    res.send(post)}catch(err){res.send({"error":err.message})}
})


postRouter.get("/top",async(req,res)=>{
    try{
        const post = await PostModel.find().sort({no_if_comments:-1}).limit(1)
        res.send(post)
    }catch(err){res.send({"error":err.message})}
})


postRouter.post("/create",async(req,res)=>{
    const payload = req.body;
    try{
        const post = new PostModel(payload);
        await post.save();
        res.send({"msg":"post created"})
    }catch(err){res.send({"error":err.message})}
})


postRouter.patch("/update/:id",async(req,res)=>{
    const Id = req.params.id;
      const post = await PostModel.find({_id:Id,user:req.body.user})
      try{
        if(post.length>0){
            await PostModel.findByIdAndUpdate({_id:Id},req.body)
            res.send({"msg":"post updated successfully"})
        }else{ res.send({"msg":"you are not authorized user"})}
      }catch(err){res.send({"error":err.message})}
})


postRouter.delete("/delete/:id",async(req,res)=>{
    const Id = req.params.id;
      const post = await PostModel.find({_id:Id,user:req.body.user})
      try{
        if(post.length>0){
            await PostModel.findByIdAndDelete({_id:Id})
            res.send({"msg":"post deleted successfully"})
        }else{ res.send({"msg":"you are not authorized user"})}
      }catch(err){res.send({"error":err.message})}
})




module.exports={
    postRouter
}