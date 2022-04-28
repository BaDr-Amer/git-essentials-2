import mongoose from "mongoose";   
import paginate from 'mongoose-paginate-v2'
import mongoose_delete from 'mongoose-delete'
const options = {
    discriminatorKey: 'type',
    collection: 'Story',
    timestamps: true
    
}

const storySchema = new mongoose.Schema({
user_id : {type : mongoose.Schema.Types.ObjectId,required :true},
title : {type : String ,required   : true},
expireAt :  {type : Date , expires :0 },
},options).
index({title :'text' , user_id :'text' }, {name : 'textIndecies',weights :{ user_id : 2 ,title :1}})


storySchema.plugin(mongoose_delete, { deletedAt: true, deletedBy: true })
storySchema.plugin(mongoose_delete, { overrideMethods: ['find', 'count', 'countDocuments', 'findOne', 'findOneAndUpdate', 'update'] })

export default mongoose.model('Story', storySchema)


