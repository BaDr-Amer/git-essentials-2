import * as service from './service.js'

export const create = async (req, res) => {
    const { bookName, ISBN, author_id, book_cover_image } = req.body
    const book = await service.create({ bookName, ISBN, author_id, book_cover_image })
    res.send(book)
}


export const findById = async (req, res) => {
    const book = await service.findById(req.params.id)
    res.send(book)
}

export const find = async (req, res) => {
    const { name, ISBN, author, page, limit } = req.query;
    const books = await service.find({ name, ISBN, author, page, limit })
    res.send(books)
}