import { body } from 'express-validator'
import validate from '../../../core/errorMiddleware.js'

const rules = [
    body('ImageURL')
        .exists().withMessage('ImageURL is required').bail()
        .isURL().withMessage('Invalid URL.')
]

export default validate(rules)