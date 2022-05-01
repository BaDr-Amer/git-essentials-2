import mongoose from "mongoose";   
import paginate from 'mongoose-paginate-v2'
import mongoose_delete from 'mongoose-delete'
import aggregatePaginate  from "mongoose-aggregate-paginate-v2";


const storySchema = new mongoose.Schema({
user_id : {type : mongoose.Schema.Types.ObjectId,required :true},
expireAt :  {type : Date , expires :0 },
Image : { type: String },
text : { type: String },
userName :{type :String ,required : true},
title : {type : String ,required   : true},
fullName : String,
viewersCount  : {type : Number, default :0}
},{timestamps :true})
.index({title :'text' , userName :'text' }, {name : 'textIndecies',weights :{ user_id : 2 ,title :1}})



storySchema.plugin(aggregatePaginate)
storySchema.plugin(paginate)
storySchema.plugin(mongoose_delete, { deletedAt: true, deletedBy: true })
storySchema.plugin(mongoose_delete, { overrideMethods: ['find', 'count', 'countDocuments', 'findOne', 'findOneAndUpdate', 'update'] })

export default mongoose.model('stories', storySchema)


