import { param ,body} from 'express-validator'
import validate from '../../../core/errorMiddleware.js'
import { findById } from '../service.js'

const rules = [
    body('Image')
        .isURL().withMessage('u should add valid image URL').bail(),
    body('title')
        .exists().withMessage('u should add title')
        
]

export default validate(rules)