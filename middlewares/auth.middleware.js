
const jwt=require("jsonwebtoken");
require("dotenv").config();


const auth=(req,res,next)=>{

    const token=req.headers.authorization?.split(" ")[1];

    try {

        if(token){
          
            const decodeT=jwt.verify(token,process.env.secretKey);
            // console.log(decodeT);

            req.body.userName=decodeT.userName;
            req.body.userId=decodeT.userId;

            next();

        }else{
            res.status(401).json({msg:"User is not authenticated"})
        }
        
    } catch (error) {
        console.log(error);
        res.status(400).json({error});
    }
    
}


module.exports={
    auth
}