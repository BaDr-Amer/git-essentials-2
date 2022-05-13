import express from 'express';
const router = express.Router()
import formidable from 'formidable'

router.post('/', (req, res, next) => {
    const form = formidable({ multiples: true });

    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err)
            return
        }
        res.json({ files })
    });
});

export default router