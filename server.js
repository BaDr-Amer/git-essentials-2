import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/users.js"


const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/*app.use('/', (req, res, next) => {
    req.isAuthenticated = true
    req.isAuthorized = true
    next()
})*/
async function connect() {
    await mongoose.connect('mongodb://localhost:27018/base');
  }
  connect().then(()=> {
    const app = express();
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use('/users', userRouter)

    app.listen(3000, () => {
    console.log("server is listening on port 3000");
    })
}).catch(err=> console.log(err))
