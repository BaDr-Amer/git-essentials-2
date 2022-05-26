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
const updatelogs_1 = __importDefault(require("../Jobs/updatelogs"));
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let atEnd = performance.now() - req.atStart;
    let date = req.body.createdAt;
    if (req.method === 'GET' || req.body.createdAt == undefined) {
        date = new Date();
    }
    else if (req.body.createdAt.getTime() !== req.body.updatedAt.getTime()) {
        date = req.body.updatedAt;
    }
    let log = {
        UserId: req.userId,
        OriginalUrl: req.originalUrl,
        Method: req.method,
        Status: res.statusCode,
        Date: date,
        ResponseTime: atEnd
    };
    const x = yield updatelogs_1.default.add(log);
});
