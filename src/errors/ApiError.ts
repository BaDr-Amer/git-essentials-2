class ApiError {
    constructor(public code, public message) {
    }

    static badRequest(message :string) {
        return new ApiError(400, message)
    }

    static serverError(message :string) {
        return new ApiError(500, message)
    }
    static duplicatedError(message :string) {
        return new ApiError(409, message)
    }
    static userNotFoundError(message :string) {
        return new ApiError( 404, message)

    }
    static wrongEmailOrPassword(message :string) {
        return new ApiError(401, message)

    }
}

export { ApiError }