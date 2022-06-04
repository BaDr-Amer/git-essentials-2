import mongoose from "mongoose";

const options = {
   discriminatorKey: 'when',
   collection: 'Reminder',
   timestamps: true

}

const reminderSchema  =  new  mongoose.Schema({

   reminderName : String,
   repetition : Number,
   interval : String , 
   
}).index({reminderName :1 }, )

export default mongoose.model('Reminder', reminderSchema)