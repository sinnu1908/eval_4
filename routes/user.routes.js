
const express=require("express");
const { registerUser, loginUser } = require("../controllers/user.controller");

const userRoute=express.Router();

userRoute.post("/users/register",registerUser);
userRoute.post("/users/login",loginUser);



module.exports=userRoute;