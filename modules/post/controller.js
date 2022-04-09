import * as service from './service.js'

export const createPost = async (req, res) => {
    const { content } = req.body
    const user_id= req.user_id
    const postDoc =  await service.createPost({content ,user_id  })
    const post_id = postDoc._id
    const likeDoc = await service.createLikeDoc(post_id)
   return res.send([postDoc,likeDoc])
}
export const likePost= async (req, res) => {
   const user_id= req.user_id
   const post_id =  req.params.postID
   const isLiking =  await service.isLiking({post_id,user_id})
   const incrementLikePost=  await service.incrementLike({post_id})
   return res.send([isLiking,incrementLikePost])
}

export const addComment = async (req, res) => {
   const user_id= req.user_id
   const post_id = req.params.postID
   const { content } = req.body
   const addComment = await service.addComment({post_id,user_id,content})
   return res.send(addComment)
}
