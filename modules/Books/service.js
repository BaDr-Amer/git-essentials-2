import Books from "../../models/Book.js";

export const create = async ({ name, ISBN, author_id, book_cover_image }) => {
  const create = await Books.create({
    name,
    ISBN,
    author_id,
    book_cover_image,
  });
  return create
};

export const dynamicFind =async (query) => {
const find = await Books.find(query)
return find

}