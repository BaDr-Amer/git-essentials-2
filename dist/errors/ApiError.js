"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
class ApiError {
    constructor(code, message) {
        this.code = code;
        this.message = message;
    }
    static badRequest(message) {
        return new ApiError(400, message);
    }
    static serverError(message) {
        return new ApiError(500, message);
    }
    static duplicatedError(message) {
        return new ApiError(409, message);
    }
    static userNotFoundError(message) {
        return new ApiError(404, message);
    }
    static wrongEmailOrPassword(message) {
        return new ApiError(401, message);
    }
}
exports.ApiError = ApiError;
