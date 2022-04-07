import express from "express";
import userRouter from "./routes/users.js"
import profilesRouter from "./routes/profiles.js"
import mongoose from "mongoose"


async function connect(){
    await mongoose.connect('mongodb://localhos:2018/base')
}
connect.then(()=>{
    const app = express();
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use('/users', userRouter)
  
    app.listen(3000, () => {
        console.log("server is listening on port 3000");
    })
}).catch(err =>console.log(err))



