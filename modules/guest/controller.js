import * as service from './service.js'


export const getPostContent= async (req, res) => {
const post_id = req.params.postID
const postDoc= await service.getPost({post_id})
const {content,user_id}= postDoc
const userDoc= await service.getUser({user_id})
const {fullName } = userDoc
const post = fullName + ' :' + content
return res.send(post)

}

export const getPostComments =async (req, res) => {
const post_id= req.params.postID
const getcomments =await service.getComments({post_id})
return res.send(getcomments)

}
export const getUsersLikedPost =async (req, res)=>{
const post_id=req.params.postID
const getUsersLikedPost=await service.getUsersLikedPost({post_id})
return res.send(getUsersLikedPost)
}