import { body } from 'express-validator'
import validate from '../../../core/errorMiddleware.js'


const rules = [
    body('first_Name')
        .exists({
            checkFalsy: true,
            checkNull: true
        }).withMessage('First name is required').bail()
        .isLength({ min: 2 }),
    body('last_Name')
        .exists({
            checkFalsy: true,
            checkNull: true
        }).withMessage('Last name is required').bail()
        .isLength({ min: 2 }),
    body('author_image')
        .isURL().withMessage('Invalid URL.')
]

export default validate(rules)