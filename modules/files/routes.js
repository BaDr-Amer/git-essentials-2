import express from "express";
const router = express.Router();
import * as controller from './controller.js'
import multer from 'multer'
const upload = multer({ dest: 'uploads' })

router.post('/',upload.single('file'),controller.uploadFile)

export default router