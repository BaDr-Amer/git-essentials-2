import express from "express";
import userRouter from "./modules/user/routes.js"
import postRouter from "./modules/post/routes.js"
import adminRouter from "./modules/admin/routes.js"
import lookupRouter from "./modules/Lookup/routes.js"
import { ApiError } from "./errors/ApiError.js"
import connect from './core/db.js'
import cluster from 'cluster';
import http from 'http';
import { cpus } from 'os';
import process from 'process';

const numCPUs = cpus().length;

const setup = () => {
    connect().then(() => {
        const app = express()
        app.use(express.json())
        app.use(express.urlencoded({ extended: true }))

        app.use('/users', userRouter)
        app.use('/posts', postRouter)
        app.use('/admins', adminRouter)
        app.use('/lookup', lookupRouter)

        app.use((err, req, res, next) => {
            if (err instanceof ApiError) {
                return res.status(err.code).json(err)
            }
            res.status(500).send({
                code: 500,
                message: 'Something broke!'
            })
        })

        app.listen(3000, () => {
            console.log("server is listening on port 3000");
        })
    }).catch(err => console.log(err))
}
if (cluster.isMaster) {
    console.log(`Primary ${process.pid} is running`);
    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {
    // Workers can share any TCP connection
    // In this case it is an HTTP server
    setup()

    console.log(`Worker ${process.pid} started`);
}
