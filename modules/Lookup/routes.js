import express from 'express';
const router = express.Router()
import createPostValidator from './validators/createPost.js'
import createLikeValidator from './validators/createLike.js'
import paramIdValidator from './validators/paramId.js'
import * as controller from './controller.js'
import authenticationMiddleware from '../../middlewares/authentication.js'
import Lookup from '../../models/Lookup.js'
import process from 'process'

router.get('/', async function (req, res) {
    console.log(process.pid)
    const x = await Lookup.find({ name: "Jordan" }).lean()
    // for await (const item of Lookup.find({}).batchSize(5000).lean()) {
        
    // }
    res.send({
        x: process.pid
    })

})

export default router