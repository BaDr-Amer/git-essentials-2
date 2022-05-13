import { body } from 'express-validator'
import validate from '../../../core/errorMiddleware.js'

const rules = [
    body('first_name')
        .exists({
            checkFalsy: true,
            checkNull: true
        }).withMessage('First Name is required').bail()
        .isLength({ min: 2, max: 30 })
    // body('author_image')
    //     .optional({
    //         checkFalsy: true,
    //         checkNull: true
    //     })
    //     .isURL({}).withMessage('image should be of a valid URL')
]

export default validate(rules)