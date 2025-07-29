require("dotenv").config();
const express= require("express");
const { userModel, adminModel,courseModel } = require("../db");
const adminrouter=express.Router();
const {adminAuth}=require("../adminAuth");

const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt");



adminrouter.post("/admin/signup",async(req,res)=>{
    try {
        const {username, password}=req.body;
        const hashpassword=await bcrypt.hash(password,10);
        const adminuser=await adminModel.create({
            username,
            password:hashpassword
        })

        return res.status(200).json({
            message:"admin created successfully",
            adminuser
        })
    } 
    catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
})


adminrouter.post("/admin/signin",async(req,res)=>{
    try {
        const {username, password}=req.body;
        const adminuser=await adminModel.findOne({
            username
        })

        const passwordMatch = bcrypt.compare(password, adminuser.password);

        if(adminuser && passwordMatch)
        {
            const token = jwt.sign({
                id: adminuser._id.toString()
            }, process.env.JWT_SECRET);


            return res.status(200).json({
                message: "user sigin successfully",
                token: token,
                adminuser
            })
        }
        else{
            return res.status(401).json({
                message:"admin not sigin succesuffly",
            })
        }


       
    } 
    catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
})


adminrouter.post("/admin/createcourse",adminAuth,async(req,res)=>{
    try {
       const {title,description,price,imageUrl}=req.body;
       console.log(`req is ${req.user}`)
       const courseDetail=await courseModel.create({
         title,
         description,
         price,
         imageUrl,
         createdBy:"6887c0dc2c4ce7d10b667523"
       })

       return res.status(200).json({
            message: "course created successfully",
            courseDetail
       })
    } 
    catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
})


module.exports={
    adminrouter
}
