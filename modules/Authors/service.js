import Book from '../../models/Book.js'
import Author from '../../models/Author.js'


export const create = async({firstName , lastName, author_image }) =>{
const create = await Author.create({firstName , lastName, author_image })
return create
}
