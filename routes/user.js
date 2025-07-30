require("dotenv").config();
const express= require("express");
const { userModel, purchaseModel, courseModel } = require("../db");
const userrouter=express.Router();
const {auth}=require("../auth");
const jwt=require("jsonwebtoken")

const bcrypt=require("bcrypt");


userrouter.post("/signup",async(req,res)=>{
    try {
        const {username, password}=req.body;
         const result=await userModel.findOne({
            username
         });
        if(result)
        {
            return res.status(403).json({
                message: "username already exist"
            })
        }

        const bcyrptpassword=await bcrypt.hash(password,10);

       const user= await userModel.create({
            username,
            password:bcyrptpassword
        })

        return res.status(200).json({
            message: "user register successfully",
            user
        })


    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
})


userrouter.post("/signin",async(req,res)=>{
    try {
        const {username, password}=req.body;
        

       const user= await userModel.findOne({
            username,
        })

        const passwordMatch = bcrypt.compare(password, user.password);

        if(user && passwordMatch){
            const token = jwt.sign({
                id: user._id.toString()
            }, process.env.JWT_SECRET);


            return res.status(200).json({
                message: "user sigin successfully",
                token: token,
                user
            })
        }
        else{
            return res.json(401).json({
                message: "user not sigin succesfully"
            })
        }

       

        


    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
})

//route to enable user to buy the course
userrouter.get("/course/:courseid",auth,async(req,res)=>{
    try {
         const courseid=req.params.courseid;
         const username=req.username;

         //check if the course with the given courseid exist 
         const result=await courseModel.findById({
            _id:courseid
         })

         //console.log(result);

         if(!result)
         {
            return res.status(404).json({
                message: "course id does not exist"
            })
         }
         const coursebought=await userModel.updateOne({
            username:username
         },{
            "$push":{
                purchasedCourseId:courseid
            }
         })

        // console.log(coursebought)

         await purchaseModel.create({
            user:req.id,
            course:courseid

         })

         return res.status(200).json({
            message: "course brought successfully"
         })
         
    } 
    catch (error) {
        return res.status(500).json({
            message:"course can not be bought",
            error: error.message
        })
    }
})

//route to let the customer see their brought course
userrouter.get("/getmycourse",auth,async(req,res)=>{
    try {
        const user = await userModel.findById(req.id).populate("purchasedCourseId");


        if (!user) {
            return res.status(404).json({ message: "User not found" });
          }
      
          return res.status(200).json({
            message: "Courses fetched successfully",
            courses: user.purchasedCourseId
          });

        
    } 
    catch (error) {
        return res.status(500).json({
            mesage: "cannot get the courses"
        })
    }
})

userrouter.get("/getcourses",async(req,res)=>{
    try {
        const course = await courseModel.find({})


        if (!course) {
            return res.status(404).json({ message: "no course available" });
          }
      
          return res.status(200).json({
            message: "Courses fetched successfully",
            course
          });

        
    } 
    catch (error) {
        return res.status(500).json({
            mesage: "cannot get the courses"
        })
    }
})


module.exports={
    userrouter
}