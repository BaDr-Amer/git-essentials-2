import mongoose from "mongoose"

export default async function connect() {
    // await mongoose.connect('mongodb://localhost:27018/base')
    await mongoose.connect('mongodb://localhost:27018/test')
}
