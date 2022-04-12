import mongoose from 'mongoose'

const schemaUser = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    type: { type: String },
    idpost: { type: String, required: true }, 
    arrayOfUserPutLike: []
    
})

 const addFriend = function  async (req, res, next)
{
const {email} =  req.body.email
schemaUser.findOneAndUpdate({email:email}, {$push: {arrayOfUserPutLike:email }});
};
export default mongoose.model('task_Social_networking_sit', schemaUser)