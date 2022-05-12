import { body } from 'express-validator'
import validate from '../../../core/errorMiddleware.js'
import { findByEmail } from '../service.js'
const rules = [
    body('firstName')
        .isLength({ min: 4, max: 20 }).isAlpha().withMessage('should only contain alphabetic characters'),
    body('lastName')
        .isLength({ min: 4, max: 20 }).isAlpha().withMessage('should only contain alphabetic characters'),
    body('author_image').isURL().withMessage('should be valid url '),
   
]

export default validate(rules)