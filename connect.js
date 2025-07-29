
//import mongoose from "mongoose";

const mongoose=require("mongoose");


const connectDB=async()=>{

    console.log("inside the db call");
    const res=await mongoose.connect("mongodb+srv://10xdevspd:10xdevspd@courseselling.elilrdj.mongodb.net/courseSelling");
    if(res)
    {
        console.log("db connected successfully");
    }
    else{
        console.log("db connection error");
    }
}

module.exports={
    connectDB
}