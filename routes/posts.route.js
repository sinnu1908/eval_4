
const express=require("express");
const { addPost, getPost, uptPost, dltPost } = require("../controllers/posts.controller");
const { auth } = require("../middlewares/auth.middleware");

const postRoute=express.Router();

//auth middleware
postRoute.use(auth);

//posts routes
postRoute.get("/",getPost);
postRoute.post("/add",addPost);
postRoute.patch("/update/:id",uptPost);
postRoute.delete("/delete/:id",dltPost);


//module exports
module.exports=postRoute;
