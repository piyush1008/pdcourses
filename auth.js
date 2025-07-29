//import { userModel } from "./db";

const {userModel}=require("./db")


const jwt=require("jsonwebtoken");

const auth=async(req,res,next)=>{
    try {
        const token =req.headers.authorization;

        const decodeToken=await jwt.verify(token ,process.env.JWT_SECRET);
        console.log(`decoded token is ${JSON.stringify(decodeToken)}`);

        console.log(req);
        const user=await userModel.findOne({
            _id:decodeToken.id
        });

        if(user)
        {
            req.username=user.username;
            req.id=user._id;
            next();
        }
        return res.status(404).json({
            message: "please sigin in first"
        })
    } 
    catch (error) {
        return res.status(404).json({
            message: "please sigin in first"
        })
    }

}

module.exports={
    auth
}