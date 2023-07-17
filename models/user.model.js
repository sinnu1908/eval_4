const mongoose=require("mongoose");

//user registration schema

const userSchema=mongoose.Schema({
    name:{type:String,required:[true,"name is required"]},
    email:{type:String,required:[true,"email is required"]},
    gender:{type:String,required:[true,"gender is required"]},
    password:{type:String,required:[true,"password is required"]},
})

//user registration model

const userModel=mongoose.model("user",userSchema);



module.exports={
    userModel
}
