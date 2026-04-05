// connect with node.js to DB using mongoose - its like a bridge
const dotenv=require("dotenv")
// import mongoose
const mongoose = require("mongoose")

const connectionString =process.env.CONNECTIONSTRING
console.log("connection string:",connectionString);

// mongoose connection string use cheyth connect cheyyanam , this will return promise - .then and catch method
mongoose.connect("mongodb://localhost:27017/test").then((res)=>{
    console.log("MongoDB Connected Successfully");
    
}).catch(err=>{
    console.log("MongoDB Failed......");
    console.log(err);
    
    
})
