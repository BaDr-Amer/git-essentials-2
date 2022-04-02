import express from "express";
import userRouter from "./routes/users.js";
//import profilesRouter from "./routes/profiles.js"
import mongoose from "mongoose";

async function connect() {
  await mongoose.connect("mongodb://localhost:27018/base");
}
connect()
  .then(() => {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use("/", (req, res, next) => {
      req.isAuthenticated = true;
      req.isAuthorized = true;
      next();
    });

    app.use("/users", userRouter);
    //app.use('/profile', profilesRouter)

    app.listen(3000, () => {
      console.log("server is listening on port 3000");
    });
  })
  .catch((err) => console.log(err));
