import mongoose from "mongoose"

export default async function connect() {
     await mongoose.connect('mongodb://localhost:27018/test')
   //await mongoose.connect('mongodb+srv://nodejs:*****@cluster0.l4sky.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
}
