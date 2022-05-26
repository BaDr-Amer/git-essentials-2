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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const validateToken = token => {
    const __dirname = path_1.default.resolve();
    const secret = fs_1.default.readFileSync(__dirname + '\\privateKey');
    return jsonwebtoken_1.default.verify(token, secret, { algorithms: ['RS256'] });
};
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const auth_header = req.headers['authorization'];
    const token = auth_header && ((_a = auth_header.split(' ')) === null || _a === void 0 ? void 0 : _a[1]);
    if (!token)
        return res.status(401).json({
            message: 'missing token'
        });
    try {
        const payload = validateToken(token);
        if (payload) {
            req.userId = payload['_id'];
            // req.isInfected= payload['isInfected']
            req.atStart = performance.now();
            return next();
        }
    }
    catch (e) {
        return res.status(401).json({
            message: 'Invalid token'
        });
    }
    next();
});
