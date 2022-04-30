import mongoose from "mongoose"

export default async function connect() {
    // await mongoose.connect('mongodb://localhost:27018/base')
    await mongoose.connect('mongodb://localhost:27017,localhost:27018,localhost:27019/?replicaSet=rs0&readPreference=primary&ssl=false')
    // await mongoose.connect('mongodb+srv://nodejs:rHamqoLqxqxeZ7r2@cluster0.l4sky.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
}
