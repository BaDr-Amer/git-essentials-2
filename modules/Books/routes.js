import express from 'express';
const router = express.Router()
import * as controller from './controller.js'
import authenticationMiddleware from '../../middlewares/authentication.js'
import findBookvalidation from './validators/findBookValidator.js'
import createBookValidation from './validators/createBookValidator.js'
//router.use(authenticationMiddleware)

router.post('/',createBookValidation, controller.create)
router.get('/',findBookvalidation, controller.dynamicFind)

export default router