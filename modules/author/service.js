import Author from '../../models/Author.js'


export const create = async ({ first_Name, last_Name, author_image }) => {
  return await Author.create({ first_Name, last_Name, author_image })
}

export const findById = async (id) => {
  return await Author.findById(id)
}

