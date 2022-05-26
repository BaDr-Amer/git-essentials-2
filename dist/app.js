"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./core/db"));
const ApiError_1 = require("./errors/ApiError");
const routes_1 = __importDefault(require("./module/user/routes"));
const ioredis_1 = __importDefault(require("ioredis"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const auditLog_1 = __importDefault(require("./middlewares/auditLog"));
(0, db_1.default)().then(() => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    const redis = new ioredis_1.default({});
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use('/users', routes_1.default);
    app.use((err, req, res, next) => {
        if (err instanceof ApiError_1.ApiError) {
            return res.status(err.code).json(err);
        }
        res.status(500).send({
            code: 500,
            message: 'Something broke!'
        });
        next();
    });
    app.use(auditLog_1.default);
    const serverSocket = http_1.default.createServer(app);
    const io = new socket_io_1.Server(serverSocket);
    io.on('connection', (socket) => {
    });
    serverSocket.listen(3000, () => {
        console.log("server is listening on port 3000");
    });
}));
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
