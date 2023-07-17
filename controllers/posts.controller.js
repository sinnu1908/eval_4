const { postModel } = require("../models/posts.model");


// add posts
const addPost=async(req,res)=>{

   const {title, body, device}=req.body;
   
try {

    if(!title || !body || !device){
        res.status(200).json({msg:"Please fill all the required fields"})
       }
       else{
    
         const newPost=await new postModel(req.body);
         await newPost.save();
         res.status(201).json({msg:"post added successfully",post:{title,body,device}})
       }
    
} catch (error) {
    console.log(error)
    res.status(400).json({error});
}
   
}

//get posts

const getPost=async (req,res)=>{

    const {device1,device2}=req.query;
    const {userId}=req.body;
    const myquery={};

    try {

        if(userId){
            myquery.userId=userId;
        }
    
        if(device1 && device2){
            myquery.$or=[{device:device1},{device:device2}]
        }else if(device1){
            myquery.device=device1
        }
    
        console.log(myquery)
    
        const posts=await postModel.find(myquery);
    
        res.status(200).json({posts})
        
    } catch (error) {
        console.log(error)
        res.status(400).json({error});

    }
}


//update the post

const uptPost=async(req,res)=>{

    const {userId,title,body,device}=req.body;
    const {id}=req.params;

    try {

        const postInDb=await postModel.findOne({_id:id});

        if(postInDb.userId===userId){
            await postModel.findByIdAndUpdate({_id:id},{title,body,device});
            const updatedPost=await postModel.findOne({_id:id});
            res.status(200).json({msg:"post updated successfully",updatedPost})
        }else{
    
            res.status(401).json({msg:"User is not authenticated"})
        }
        
    } catch (error) {
        console.log(error)
        res.status(400).json({error});
    }
}


//delete Post

const dltPost=async(req,res)=>{

    const {userId}=req.body;
    const {id}=req.params;

    try {

        const postInDb=await postModel.findOne({_id:id});

        if(postInDb.userId===userId){
            await postModel.findByIdAndDelete({_id:id});
            res.status(200).json({msg:"post updated successfully",deletedPost:postInDb});
        }else{
            res.status(401).json({msg:"User is not authenticated"})
        }
        
    } catch (error) {
        console.log(error)
        res.status(400).json({error});
    }
}


//module exports
module.exports={
    addPost,
    getPost,
    uptPost,
    dltPost,
}