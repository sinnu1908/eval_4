const { userModel } = require("../models/user.model");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
//Register User



const registerUser=async(req,res)=>{

    const {name,email,gender,password}=req.body;

    try {

        if(!name || !email || !gender || !password){
            res.status(200).json({msg:"Please fill all the required fields"})
        }
        else{
          
            const userAvailable=await userModel.findOne({email});
            //checking already registered or not
    
            if(userAvailable){
                res.status(200).json({msg:"User already registered with us, Please login"})
            }else{
    
                bcrypt.hash(password,5,async(err,hash)=>{
    
                    if(err){
                        res.status(402).json({msg:"Something went wrong,Please try again after some times"})
                    }else{
    
                        const newUser=await new userModel({
                            name,
                            email,
                            gender,
                            password:hash
                        })
                        await newUser.save();
                        res.status(201).json({msg:"New user added successfully",newUser:req.body})
    
    
                    }
                })
            }
        }
        
    } catch (error) {
        
        console.log(error);
        res.status(400).json({error})
    }
}


//login user

const loginUser=async(req,res)=>{

    const {email,password}=req.body;

    if(!email || !password){
        res.status(200).json({msg:"Please fill the required fields"})
    }else{

        const checkEmail=await userModel.findOne({email});

        if(!checkEmail){
            res.status(200).json({msg:"Email is incorrect"})
        }else{

            bcrypt.compare(password, checkEmail.password, async(err, result) =>{
                
                if(result){

                    const token=jwt.sign({
                        userName:checkEmail.name,
                        userId:checkEmail._id
                    },
                    process.env.secretKey,
                    {
                        expiresIn:"300m"

                    });

                    res.status(200).json({msg:"Login successfull",token})


                }else if(!result){
                    res.status(200).json({msg:"Password is incorrect"})

                }else{
                    res.status(402).json({msg:"Something went wrong, Please try after some times"})
                }
            }); 
        }


    }
}

module.exports={
    registerUser,
    loginUser,
}