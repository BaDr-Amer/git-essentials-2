import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
parent_id : {type: mongoose.Schema.Types.ObjectId},
user_id :  {type: mongoose.Schema.Types.ObjectId ,required: true},
likesNumber : Number,
content : String,
iscomment : Boolean
})
export default mongoose.model('posts', postSchema)