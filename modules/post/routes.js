import express from 'express';
import Middleware from '../../middlewares/authentication.js';
import * as postController from '../post/controller.js'
import  checkIfLiked from './autharization/likeAuthentication.js';
import  checkEmptyValidator from './autharization/commentOrPostAuthentication.js'
const router = express.Router()

router.use(Middleware)

router.post('/post/createpost', checkEmptyValidator ,postController.createPost)

router.post('/post/addComment/:postID',checkEmptyValidator,postController.addComment)

router.patch('/post/addLike/:postID', checkIfLiked , postController.likePost)




export default router