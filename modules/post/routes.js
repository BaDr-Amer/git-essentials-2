import express from 'express';
const router = express.Router()
import createPostValidator from './validators/createPost.js'
import createLikeValidator from './validators/createLike.js'
import paramIdValidator from './validators/paramId.js'
import * as controller from './controller.js'
import authenticationMiddleware from '../../middlewares/authentication.js'
import seed from '../../models/Seed.js'

router.use(authenticationMiddleware)

router.post('/', createPostValidator, controller.create)

router.post('/:id/like', paramIdValidator, controller.like)

router.get('/',async function (req, res ){
const x = await seed.findOne({fileName : "countries"})

res.send(x)

})

router.get('/:id', paramIdValidator, controller.findById)

router.put('/:id', createPostValidator, controller.create)

router.delete('/:id', paramIdValidator, controller.remove)

export default router