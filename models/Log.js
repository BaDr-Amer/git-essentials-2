import mongoose from "mongoose";
const logSchema = mongoose.Schema({
    who:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    what:{type:String},
    Method:{type:String},
    How:{type:Number},
    When:{type:Date},
    ResponseTime:{type:Number}
})
export default mongoose.model('Log',logSchema)