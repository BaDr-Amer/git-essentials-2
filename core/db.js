import mongoose from "mongoose"

export default async function connect() {
    // await mongoose.connect('mongodb://localhost:27018/base')
    await mongoose.connect('mongodb+srv://root:qCLFFBLPxiyyM7zt@cluster0.noszi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
}
