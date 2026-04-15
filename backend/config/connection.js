const mongoose = require("mongoose")
const connectionString =process.env.CONNECTIONSTRING
console.log("connection string:",connectionString);

mongoose.connect(connectionString).then((res)=>{
    console.log("MongoDB Connected Successfully");    
}).catch(err=>{
    console.log("MongoDB Failed......");
    console.log(err);    
})
