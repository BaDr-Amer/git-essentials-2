import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
user_id :  {type: mongoose.Schema.Types.ObjectId ,required: true},
likesNumber : Number,
content : String,
})
export default mongoose.model('posts', postSchema)