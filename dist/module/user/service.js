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
exports.changeInfection = exports.findByEmail = exports.login = exports.create = void 0;
const User_1 = __importDefault(require("../../model/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const fs_1 = __importDefault(require("fs"));
const ApiError_1 = require("../../errors/ApiError");
const ioredis_1 = __importDefault(require("ioredis"));
const redis = new ioredis_1.default({});
const create = ({ email, password, firstName, lastName, middleName, isInfected }) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = yield bcrypt_1.default.hash(password, 3);
    const user = yield User_1.default.create({ email, password: hash, firstName, lastName, middleName, isInfected });
    const obj = { user, emailTemplate: '' };
    return user;
});
exports.create = create;
const login = ({ email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, exports.findByEmail)(email);
    if (!user)
        throw ApiError_1.ApiError.wrongEmailOrPassword('wrongEmailOrPassword');
    const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!passwordMatch)
        throw ApiError_1.ApiError.wrongEmailOrPassword('wrongEmailOrPassword');
    const token = jsonwebtoken_1.default.sign({
        _id: user._id,
        email: user.email,
        isInfected: user.isInfected
    }, fs_1.default.readFileSync('./privateKey'), { algorithm: 'RS256' });
    return { token, user };
});
exports.login = login;
const findByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield User_1.default.findOne({ email });
});
exports.findByEmail = findByEmail;
const changeInfection = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOneAndUpdate(userId, [{ $set: { isInfected: { $eq: [false, "$isInfected"] } } }]);
    if (!user)
        throw ApiError_1.ApiError.userNotFoundError('userNotFound');
});
exports.changeInfection = changeInfection;
