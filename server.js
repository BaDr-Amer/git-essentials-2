import express from "express";
import userRouter from "./modules/user/routes.js"
import mongoose from "mongoose"
import postRouter from "./modules/post/routes.js"
import getRouter from "./modules/guest/routes.js"
async function connect() {
    await mongoose.connect('mongodb://localhost:27018/base')
}

connect().then(() => {
    const app = express();
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use('/users', getRouter)
    app.use('/users', userRouter)
    app.use('/users', postRouter)
    
    app.listen(3000, () => {
        console.log("server is listening on port 3000");
    })
}).catch(err => console.log(err))
