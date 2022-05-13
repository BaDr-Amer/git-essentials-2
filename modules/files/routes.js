import express from 'express';
const router = express.Router()
import formidable from 'formidable'
import { fileURLToPath } from 'url'

router.post('/', (req, res, next) => {
    const form = formidable({ multiples: true });

    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err)
            return
        }
        res.json({ files })
    })
})

router.get('/', (req, res, next) => {
    const { key } = req.query
    const __filename = fileURLToPath(`file://${key}`)
    res.sendFile(__filename)
})

export default router