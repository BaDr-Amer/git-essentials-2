import mongoose from "mongoose";




const NotificationSchema  =  new  mongoose.Schema({
    user_id : {type: mongoose.Schema.Types.ObjectId , ref: 'User'},
    text : String,
    read : Boolean
   
}).index({user_id :1 }, )

export default mongoose.model('Notification', NotificationSchema)