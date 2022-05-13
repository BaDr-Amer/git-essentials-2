import { ApiError } from '../../errors/ApiError.js'
import Author from '../../models/Author.js'
import Book from '../../models/Book.js'

export const create = async ({ name, ISBN, author_id, book_cover_image }) => {
    let author = await Author.findById(author_id).select('fullName')
    if (!author) {
        throw ApiError.notFound('Author not Found')
    }
    return await Book.create({ name, ISBN, author, book_cover_image })
}

export const update = async ({ id, name, ISBN, author_id, book_cover_image }) => {
    let author = await Author.findById(author_id).select('fullName')
    if (!author) {
        throw ApiError.notFound('Author not Found')
    }
    const book = await Book.findById(id)
    if (!book) {
        throw ApiError.notFound('Book not Found')
    }
    book.name = name
    book.ISBN = ISBN
    book.author = author
    book.book_cover_image = book_cover_image
    return await book.save()
}

export const searchBook = async ({ name, ISBN, skip }) => {
    let conds = []
    if (name) conds.push({
        $match: { name: { $regex: name, $options: 'i' } }
    })
    if (ISBN) conds.push({
        $match: { 'ISBN': ISBN }
    })
    var myAggregate = Book.aggregate(conds)
    const options = {
        page: 1,
        limit: skip,
    };
    return await Book.aggregatePaginate(myAggregate, options)
}

export const viewBook = async (book_id) => {
    let book = await availableBook(book_id)
    if (!book) {
        throw ApiError.notFound('Book not Found')
    }
    return book
}
export const availableAuthor = async (author_id) => {
    return await Author.findOne({ _id: author_id })
}

export const findByISBN = async (ISBN, id) => {
    return await Book.findOne({ ISBN, _id: { $ne: id } })
}

export const availableBook = async (book_id) => {
    return await Book.findOne({ _id: book_id })
}