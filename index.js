require("dotenv").config();
const express= require("express");
const { connectDB } = require("./connect");
const cors=require("cors");
const { userrouter } = require("./routes/user");
const { adminrouter } = require("./routes/admin");



//console.log(process.env);

const app=express();

connectDB();



app.use(cors());

app.use(express.json());


app.use("/api/v1",userrouter);
app.use("/api/v1/",adminrouter);


app.listen(process.env.PORT,()=>{
    console.log(`procees running in ${process.env.PORT}`)
});

