import { param } from 'express-validator'
import validate from '../../../core/errorMiddleware.js'

const rules = [
    param('id')
        .isMongoId().withMessage('story id is not a valid mongo id')
]

export default validate(rules)