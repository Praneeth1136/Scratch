import app from "./src/app.js";
import connectDB from "./config/database.js"

connectDB().then(()=>{
    app.listen(5000,()=>{
        console.log("Server is running at PORT 5000")
    })
}).catch((err)=>{
    console.log(err);
    console.log("MongoDb connection Failed")
    throw err;
})