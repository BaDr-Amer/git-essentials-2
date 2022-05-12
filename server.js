import express from "express";

import { ApiError } from "./errors/ApiError.js"
import connect from './core/db.js'
import booksRouter from "./modules/books/routes.js"
import authorsRouter from "./modules/authors/routes.js"

connect().then(() => {
    const app = express()
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

  
   
    app.use('/books', booksRouter)
    app.use('/authors', authorsRouter)

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
