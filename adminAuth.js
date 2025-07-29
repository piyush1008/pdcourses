//import { userModel } from "./db";

const {adminModel}=require("./db")


const jwt=require("jsonwebtoken");

const adminAuth=async(req,res,next)=>{
    try {
        const token =req.headers.authorization;
        if(!token)
            {
                return res.status(401).json({
                    message:"please login first"
                })
            }

        const decodeToken=await jwt.verify(token ,process.env.JWT_SECRET);
        console.log(`admin decoded token is ${JSON.stringify(decodeToken)}`);

       // console.log(req);
        req.user=await adminModel.findOne({_id:decodeToken.id});
        if (!req.user) {
            return res.status(401).json({ message: "Admin not found" });
          }
        next();
    } 
    catch (error) {
        return res.status(404).json({
            message: "please sigin in first",
            error:error.message
        })
    }

}

module.exports={
    adminAuth
}