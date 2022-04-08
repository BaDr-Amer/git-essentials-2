import * as service from './service.js'
import mongoose from 'mongoose'
export const post = async (req, res) => {
    const { content } = req.body
    const user_id= req.user_id
    const postDoc =  await service.createPost({content ,user_id  })
    const post_id = postDoc._id
    const likeDoc = await service.createLikeDoc(post_id)
   return res.send([postDoc,likeDoc])
}
export const likePost= async (req, res) => {
   const post_id =  req.params.postIDforlike
   const user_id= req.user_id
    const isLiking =  await service.isLiking({post_id,user_id})
   const postID=  await service.incrementLike({post_id})
   return res.send([isLiking])
}
