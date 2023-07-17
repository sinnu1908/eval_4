const express=require("express");
require('dotenv').config();
const cors=require("cors");
const connection = require("./db");
const userRoute = require("./routes/user.routes");
const postRoute = require("./routes/posts.route");


const server=express();
server.use(express.json());
server.use(cors());
server.use(userRoute);
server.use("/posts",postRoute);





server.listen(process.env.port,async()=>{

    try {
        await connection;
        console.log(`server is connected at port ${process.env.port}`);
        console.log("database is connected");
        
    } catch (error) {
        console.log(error);
        res.status(400).json({error})
    }
})

