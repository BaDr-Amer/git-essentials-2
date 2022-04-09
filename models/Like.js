import mongoose from 'mongoose';

const likeSchema = mongoose.Schema({
post_id : {type: mongoose.Schema.Types.ObjectId ,required: true},
usersLiked : [{user_id :{type: mongoose.Schema.Types.ObjectId}} ]
})

export default mongoose.model('likes',likeSchema)

