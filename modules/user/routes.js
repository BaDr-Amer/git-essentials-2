import express from 'express';
const router = express.Router()
import createUserValidator from './validators/userValidation.js'
import * as controller from './controller.js'

router.post('/signup', createUserValidator, controller.create)

router.post('/login', controller.login)


//router.get('/:id', controller.findById)


//router.patch('/:id', createUserValidator, controller.update)

//router.delete('/:id', controller.remove)

export default router