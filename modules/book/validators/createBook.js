import { body, param } from 'express-validator'
import validate from '../../../core/errorMiddleware.js'


const rules = [
    body('bookName')
        .exists({
            checkFalsy: true,
            checkNull: true
        }).withMessage('Book name is required').bail()
        .isLength({ min: 4, max: 100 }),
    body('ISBIN').exists().withMessage('ISBIN is required').bail().isISBN().withMessage('it must be International Standard Book Number'),
    body('author_id').exists().withMessage('Author id is required').bail().isMongoId().withMessage('author id is not a valid mongo id'),
    body('book_cover_image')
        .exists().withMessage('Book cover image is required').bail()
        .isURL().withMessage('Invalid URL.')
]

export default validate(rules)