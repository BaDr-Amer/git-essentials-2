import mongoose from 'mongoose'

const schemaUser =new mongoose.Schema({
email:String,
password:String

})
// convert scema to model //
 export  default mongoose.model('User',schemaUser)