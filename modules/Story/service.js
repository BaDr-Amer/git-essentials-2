import Post from '../../models/Post.js'
import Like from '../../models/Like.js'
import User from '../../models/User.js'
import ImageStory from '../../models/ImageStory.js'


export const createImageStory = async ({  Image ,title,text, user_id }) => {
  const expireDate =new Date().setDate(new Date().getDate()+1)
  return await ImageStory.create({  Image ,title,text, user_id ,expireAt : expireDate})
}

