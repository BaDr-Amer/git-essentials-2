import express from 'express';
 const router = express.Router()
 import createUserValidator from './validators/createUserValidator'
 import * as controller from './controller'
  import authenticationMiddleware from '../../middlewares/authentication'
   import auditLog from '../../middlewares/auditLog'
   router.use(authenticationMiddleware)
   
   router.post('/signup', createUserValidator, controller.create)
   
   router.post('/login', controller.login)

   router.post('/change',controller.changeInfection)
   
   router.get('/:id', controller.findById)

   router.delete('/delete',controller.deleteByFirstName)

    router.use(auditLog)


 export default router