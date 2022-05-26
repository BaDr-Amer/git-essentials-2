"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user = new mongoose_1.default.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    middleName: String,
    lastName: String,
    isInfected: Boolean,
    createdAt: Date,
    updatedAt: Date
});
user.pre('save', function (next) {
    if (this.isNew) {
        this.set({ createdAt: Date.now() });
        this.set({ updatedAt: Date.now() });
        this.$locals.wasNew = this.isNew;
    }
    else {
        this.set({ updatedAt: Date.now() });
    }
    next();
});
exports.default = mongoose_1.default.model('User', user);
