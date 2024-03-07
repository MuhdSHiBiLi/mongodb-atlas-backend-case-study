const mongoose = require("mongoose");
mongoose.connect(process.env.mongo_URL).then(()=>{
    console.log("mongodb atlas connected");
}).catch((err)=>{
    console.log(`cant to connsect mongodb atlas\t${err}`)
});