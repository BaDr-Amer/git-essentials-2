import express from 'express';
const router = express.Router()
import * as controller from './controller.js'


router.post('/', controller.createReminder);


export default router