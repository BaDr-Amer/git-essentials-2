import express from "express";
import connect from "./core/db"
import { ApiError } from "./errors/ApiError"
import userRouter from "./module/user/routes"
import Redis from 'ioredis'
import { Server, Socket } from "socket.io";
import http from "http";
import auditLog from './middlewares/auditLog'

connect().then(async () => {
    const app = express();
    const redis = new Redis({});
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/users', userRouter)
    
    
    
    app.use((err, req, res, next) => {
        if (err instanceof ApiError) {
            return res.status(err.code).json(err)
        }
        res.status(500).send({
            code: 500,
            message: 'Something broke!'
        })
        next()
    })
    app.use(auditLog)
    const serverSocket = http.createServer(app);
    const io = new Server(serverSocket);
    io.on('connection', (socket) => {

    })
    serverSocket.listen(3000, () => {
        console.log("server is listening on port 3000");
    })
    
    
    
})


// socket.on('updatelocation', async (args) => {

//     let s = await redis.geoadd('tulkarem', args.latitude, args.longtitude, args._id)
//     console.log('Updating  the location for infected client id : ' + args._id)

// })
// socket.on('getradius', async (args, callback) => {

//     let zaid = await redis.georadius('tulkarem', args.latitude, args.longtitude, 100, 'm')
//     if (zaid.length == 0)
//         callback("no one infected close to you")
//     else
//         callback("someone infected close to you")
//     console.log(`sending a warning to the client id :  ` + args._id)

// })