import express from 'express';
import * as controller from './controller.js'
const router = express.Router()

router.get('/post/:postID', controller.getPostContent)
router.get('/post/getComments/:postID', controller.getPostComments)
router.get ('/post/getUsersLikedPost/:postID',controller.getUsersLikedPost)
export default router