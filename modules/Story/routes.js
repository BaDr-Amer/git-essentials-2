import express from 'express';
const router = express.Router()
import createPostValidator from './validators/createPost.js'
import * as controller from './controller.js'
import authenticationMiddleware from '../../middlewares/authentication.js'
import seed from '../../models/Seed.js'

router.use(authenticationMiddleware)

router.post('/imageStory',  controller.createImageStory)


export default router