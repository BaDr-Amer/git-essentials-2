import Post from '../../models/Post.js';
import User from '../../models/User.js';
import Like from '../../models/Like.js';

export const getPost =async ({post_id}) => {
return await Post.findById(post_id)

}
export const getUser =async ({user_id}) => {
    return await User.findById(user_id)
    }

export const getComments =async ({post_id}) => {
return await Post.find({parent_id: post_id})
}

export const getUsersLikedPost=async ({post_id}) => {
const LikeUsersIDS = await Like.findOne({post_id : post_id})
const userIDS= LikeUsersIDS.usersLiked
return await User.find({_id : {$in : userIDS}})

}