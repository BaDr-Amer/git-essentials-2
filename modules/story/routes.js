import express from 'express';
const router = express.Router()
import createStoryValidator from './validators/createStory.js'
import paramIdValidator from './validators/paramId.js'
import * as controller from './controller.js'
import authenticationMiddleware from '../../middlewares/authentication.js'
import authorizationMiddleware from '../../middlewares/authorization .js'

router.use(authenticationMiddleware)

router.post('/', createStoryValidator, controller.create)

router.get('/', controller.findStory)

router.put('/:id', paramIdValidator, controller.addViewer)

router.delete('/:id', authorizationMiddleware, paramIdValidator, controller.remove)

export default router