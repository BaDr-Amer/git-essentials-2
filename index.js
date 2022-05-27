import express from 'express'
import http from 'http'
const app = express()
import { Server } from 'socket.io'

const server = http.createServer(app)

const io = new Server(server)
io.on('connection', (socket) => {
    console.log("Some one connected")
})

server.listen(3000, () => {
    console.log("web server is listening  on port 3000")
})