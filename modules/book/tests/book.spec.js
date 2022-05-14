import { find, create, findById } from "../service.js"
import { connect } from '../../../core/mongoMemoryServer.js'
import Author from '../../../models/Author'
import { body, validationResult, param } from 'express-validator/check'
import { application } from "express"

describe('book tests', () => {
    let book, author = null
    beforeAll(async () => {
        await connect()
        // author = await authorCreate({
        //     first_Name: 'Marcel',
        //     last_Name: 'Proust',
        //     author_image: 'http://t3.gstatic.com/licensed-image?q=tbn:ANd9GcSzU1TN0TNaJAl0lb56aMbffwsLCiuiE0OJNVGGPB8YKq_XoHf2WRp63ATBZD5b'
        // })
        author = await Author.findOne()
    })

    it('create book', async () => {
        // book = await create({
        //     bookName: 'In Search of Lost Time',
        //     ISBN: '9780375751547',
        //     author_id: author._id,
        //     book_cover_image: 'https://m.media-amazon.com/images/I/411fuVxxG4L.jpg'
        // })
        expect(book.bookName).toBe('In Search of Lost Time')
        expect(book.ISBN).toBe('9780375751547')
        expect(book.author_id).toBe(author._id)
        expect(book.book_cover_image).toBe('https://m.media-amazon.com/images/I/411fuVxxG4L.jpg')
    })

    it('create book', async () => {
        book = await create({
            bookName: 'Ulysses',
            ISBN: '9780141182803',
            author_id: author._id,
            book_cover_image: 'https://m.media-amazon.com/images/I/411fuVxxG4L.jpg'
        })
        expect(book.bookName).toBe('Ulysses')
        expect(book.ISBN).toBe('9780141182803')
        expect(book.author_id).toBe(author._id)
        expect(book.book_cover_image).toBe('https://m.media-amazon.com/images/I/411fuVxxG4L.jpg')
    })

    it('create book', async () => {
        book = await create({
            bookName: 'Don Quixote',
            ISBN: '9780394553733',
            author_id: author._id,
            book_cover_image: 'https://m.media-amazon.com/images/I/411fuVxxG4L.jpg'
        })
        expect(book.bookName).toBe('Don Quixote')
        expect(book.ISBN).toBe('9780394553733')
        expect(book.author_id).toBe(author._id)
        expect(book.book_cover_image).toBe('https://m.media-amazon.com/images/I/411fuVxxG4L.jpg')
    })

    it('create book with duplicate ISBN', async () => {
        try {
            book = await create({
                bookName: 'In Search of Lost Time',
                ISBN: '9780375751547',
                author_id: author._id,
                book_cover_image: 'https://m.media-amazon.com/images/I/411fuVxxG4L.jpg'
            })
        } catch (err) {
            expect(err.message).toBe('E11000 duplicate key error dup key: { : "9780375751547" }')
        }
    })


    it('find book by id ', async () => {
        const db_book = await findById(book._id)
        expect(db_book.bookName).toBe('Don Quixote')
        expect(db_book.ISBN).toBe('9780394553733')
        expect(db_book.author_id).toEqual(author._id)
        expect(db_book.book_cover_image).toBe('https://m.media-amazon.com/images/I/411fuVxxG4L.jpg')
    })

    it('find book by author id ', async () => {
        const db_book = await find({ author: author._id, page: 1, limit: 3 })
        expect(db_book.docs[0]?.ISBN).toBe('9780375751547')
        expect(db_book.docs[0]?.author_id).toEqual(author._id)
        expect(db_book.docs[0]?.book_cover_image).toBe('https://m.media-amazon.com/images/I/411fuVxxG4L.jpg')
    })
})