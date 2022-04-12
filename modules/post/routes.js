import express from 'express';
const router = express.Router()
import createUserValidator from './validators/createUserValidator.js'
import likevalidator from './validators/likeValidator.js'
import * as controller from './controller.js'
import authenticationMiddleware from '../../middlewares/authentication.js'
//router.use(authenticationMiddleware)
router.post('/post',createUserValidator ,controller.create)

router.post('/like', likevalidator,controller.AddLike)

router.get('/', controller.find)

router.get('/:id', controller.findById)

router.put('/:id', createUserValidator, controller.update)

router.delete('/:id', controller.remove)

export default router