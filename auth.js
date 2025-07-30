//import { userModel } from "./db";

const {userModel}=require("./db")


const jwt=require("jsonwebtoken");

const auth=async(req,res,next)=>{
    try {
        const token =req.headers.authorization;

        const decodeToken=await jwt.verify(token ,process.env.JWT_SECRET);
        console.log(`decoded token is ${JSON.stringify(decodeToken)}`);

        const user=await userModel.findOne({
            _id:decodeToken.id
        });
        console.log(`user info is ${user}`);
        if(!user)
        {

            return res.status(404).json({
                message: "please sigin in first",
                })
        }
        req.username=user.username;
            req.id=user._id;
            next();
    } 
    catch (error) {
        return res.status(404).json({
            message: "issue during authentication",
            error:error.message
        })
    }

}

module.exports={
    auth
}