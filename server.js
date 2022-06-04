import express from "express";
import userRouter from "./modules/user/routes.js"
import postRouter from "./modules/post/routes.js"
import adminRouter from "./modules/admin/routes.js"
import { ApiError } from "./errors/ApiError.js"
import connect from './core/db.js'
import { connection } from './core/redis.js'
import { createBullBoard } from '@bull-board/api'
import { BullAdapter } from '@bull-board/api/bullAdapter.js'
import { ExpressAdapter } from '@bull-board/express'
import redis from 'redis'
import emailsQueue from './queues/emails.js'
import cpuIntensive from './queues/cpu-intensive-task.js'
import updateStatus from './jobs/updateStatus.js'
import connectRedis from 'connect-redis'
import cookieParser from "cookie-parser"
import sessions from 'express-session'


const RedisStore = connectRedis(sessions)
const oneDay = 1000 * 60 * 60 * 24;
const redisClient = redis.createClient(connection.redis)
connect().then(() => {
    const app = express()
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(cookieParser());
    app.set('view engine', 'ejs');

    app.use(sessions({
        secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
        store: new RedisStore({ client: redisClient }),
        saveUninitialized: true,
        cookie: { maxAge: oneDay },
        resave: false
    }));
    app.use('/api/users', userRouter)
    app.use('/api/posts', postRouter)
    app.use('/api/admins', adminRouter)

    const serverAdapter = new ExpressAdapter();
    createBullBoard({
        queues: [new BullAdapter(emailsQueue), new BullAdapter(cpuIntensive), new BullAdapter(updateStatus)],
        serverAdapter: serverAdapter,
    })

    app.get('/', (req, res) => {
        let sess = req.session;
        if (sess.email) {
            return res.redirect('/admin')
        }
        res.render('pages/login');
    });


    app.post('/login', (req, res) => {
        req.session.email = req.body.email;
        res.end('done');
    });


    app.get('/admin', (req, res) => {
        if (req.session.email) {
            res.write(`<h1>Hello ${sess.email} h1><br>`);
            res.end(`'+' > Logout'`);
        }
        else {
            res.write('Please login first.');
            res.end(`'+' > Login`)
        }
    });

    app.get('/logout', (req, res) => {
        req.session.destroy();
        res.redirect('/');
    });

    app.use((err, req, res, next) => {
        if (err instanceof ApiError) {
            return res.status(err.code).json(err)
        }
        res.status(500).send({
            code: 500,
            message: 'Something broke!'
        })
    })

    serverAdapter.setBasePath('/admin/queues')
    app.use('/admin/queues', serverAdapter.getRouter())

    app.listen(3000, () => {
        console.log("server is listening on port 3000");
    })
}).catch(err => console.log(err))
