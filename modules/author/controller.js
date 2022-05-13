import * as service from './service.js'

export const create = async (req, res) => {
    const { first_Name, last_Name, author_image } = req.body
    const author = await service.create({ first_Name, last_Name, author_image })
    res.send(author)
}

export const find = async (req, res) => {
    const author = await service.find(req.params.id)
    res.send(author)
}