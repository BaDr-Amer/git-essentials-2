"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user = new mongoose_1.default.Schema({
    UserId: mongoose_1.default.Schema.Types.ObjectId,
    OriginalUrl: String,
    Method: { type: String, enum: ['GET', 'POST', 'UPDATE', 'DELETE'] },
    Status: Number,
    Date: Date,
    ResponseTime: Number
});
exports.default = mongoose_1.default.model('AuditLog', user);
