import express from 'express';
const router = express.Router()
import createUserValidator from './validators/createUserValidator.js'
import * as controller from './controller.js'
import authenticationMiddleware from '../../middlewares/authentication.js'

router.post('/signup', createUserValidator, controller.create)

router.post('/login', controller.login)

router.get('/', controller.find)

router.get('/usersAge', controller.getUsersAge)

router.get('/usersAgeBetween20and30', controller.getUserBetween20and30)

router.use(authenticationMiddleware)

router.get('/likes', controller.findUserLikes)

router.get('/age', controller.getUserAge)

router.get('/:id', controller.findById)

router.put('/:id', createUserValidator, controller.update)

router.delete('/:id', controller.remove)

export default router