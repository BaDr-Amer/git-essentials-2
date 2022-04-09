import { body } from 'express-validator'
import validate from '../../../core/errorMiddleware.js'

const rules = [body('content').notEmpty().withMessage('you cannot post or comment while the content is empty')]

export default validate(rules)