import Like from "../../../models/Like.js";
import mongoose from 'mongoose';
const  checkIfLiked = async(req, res, next) => {

 const post_id = req.params.postIDforlike
 const user_id =req.user_id
const check =await Like.exists({post_id : post_id , usersLiked :[{user_id:user_id}]})
if (check!=null){
return Promise.reject('You already Liked this post').catch(err => {
    res.send(err)
})
}
next()
}

export default checkIfLiked