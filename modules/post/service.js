import Post from '../../models/Post.js';
import Like from '../../models/Like.js'

export const incrementLike = async ({post_id })=> {

    return await Post.updateOne({_id : post_id}, {$inc :{likesNumber : 1}})
    
    }

export const createPost= async ({content, user_id }) => {
    return await Post.create({ content, user_id ,likesNumber :0 })
    }

export const isLiking = async ({post_id ,user_id}) => {
return await Like.updateOne({post_id : post_id} ,{$push : {usersLiked : [ { user_id: user_id }] }})
   
}
export const createLikeDoc =async post_id => {

return await Like.create({post_id})

}

