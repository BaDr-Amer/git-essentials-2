import express from 'express';
const router = express.Router()
import createUserValidator from './user/validators/userValidation.js'
import * as controller from './user/controller.js'
import Middleware from '../middlewares/authentication.js';
import * as postController from './post/controller.js'
import  checkIfLiked from './post/autharization/autharization.js';
router.post('/signup', createUserValidator, controller.create)

router.post('/login', controller.login)

router.use(Middleware)

router.post('/post', postController.post)


router.patch('/:postIDforlike',checkIfLiked,postController.likePost)

//router.get('/:id', controller.findById)


//router.patch('/:id', createUserValidator, controller.update)

//router.delete('/:id', controller.remove)

export default router