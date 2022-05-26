"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.findById = exports.changeInfection = exports.login = exports.create = void 0;
const ApiError_1 = require("../../errors/ApiError");
const service = __importStar(require("./service"));
const User_1 = __importDefault(require("../../model/User"));
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, firstName, lastName, middleName = "jamal", isInfected = false } = req.body;
    try {
        const user = yield service.create({ email, password, firstName, lastName, middleName, isInfected });
        res.send(user);
        req.body = user;
    }
    catch (error) {
        if (error.code == 11000)
            next(ApiError_1.ApiError.duplicatedError("duplicate"));
    }
    finally {
        next();
    }
});
exports.create = create;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const { token, user } = yield service.login({ email, password });
        res.send(token);
        req.body = user;
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
const changeInfection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const change = yield service.changeInfection(userId);
    res.send(change);
});
exports.changeInfection = changeInfection;
const findById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne({ _id: req.params.id }).lean();
    res.send(user);
    next();
});
exports.findById = findById;
