import { param } from 'express-validator'
import validate from '../../../core/errorMiddleware.js'


const rules = [
    param('name')//query
        .isLength({ min: 4 }),
    param('ISBIN').isISBN().withMessage('it must be International Standard Book Number'),
    param('author').isMongoId().withMessage('author id is not a valid mongo id'),
]

export default validate(rules)