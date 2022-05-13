import * as service from './service.js'

export const create = async (req, res, next) => {
    const { name, ISBN, author_id, book_cover_image } = req.body
    service.create({ name, ISBN, author_id, book_cover_image }).then((result => res.status(201).send(result)))
        .catch(next)
}

export const update = async (req, res, next) => {
    const { name, ISBN, author_id, book_cover_image } = req.body
    const { id } = req.params
    service.update({ id, name, ISBN, author_id, book_cover_image }).then((result => res.status(200).send(result)))
        .catch(next)
}


export const viewBook = async (req, res, next) => {
    const { id } = req.params
    service.viewBook(id).then((result => res.status(200).send(result)))
        .catch(next)

}
export const find = async (req, res) => {
    const { name, ISBN, skip } = req.query
    const books = await service.searchBook({ name, ISBN, skip })
    return res.send(books)
}