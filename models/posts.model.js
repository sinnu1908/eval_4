
const mongoose=require("mongoose");

//post schema

const postSchema=mongoose.Schema({
    title:{type:String,required:[true,"title is required"]},
    body:{type:String,required:[true,"body is required"]},
    device:{type:String,required:[true,"device is required"]},
    userName:{type:String},
    userId:{type:String}
});

//post model

const postModel=mongoose.model("post",postSchema);

module.exports={
    postModel,
}