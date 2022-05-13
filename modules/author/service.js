import Author from '../../models/Author.js'
import mongoose from 'mongoose'
import { ApiError } from '../../errors/ApiError.js'

export const create = async ({ first_name, last_name, author_image }) => {
    return await Author.create({ first_name, last_name, author_image })
}

export const update = async ({ id, first_name, last_name, author_image }) => {
    let author = await Author.findById(id)
    if (!author) {
        throw ApiError.notFound('Author not Found')
    }
    author.first_name = first_name
    author.last_name = last_name
    author.author_image = author_image
    return await author.save()
}

export const viewAuth = async (author_id) => {
    let author = await availableAuthor(author_id)
    if (!author) {
        throw ApiError.notFound('Author not Found')
    }
    return author
}

export const availableAuthor = async (author_id) => {
    return await Author.findOne({ _id: author_id })
}


export const searchAuthor = async ({ name, skip }) => {
    let filter = {}
    if (name) {
        filter = { fullName: { $regex: name, $options: 'i' } }
    }
    const authors = await Author.find(filter)
        .skip(skip)
        .limit(10)
    return authors
}