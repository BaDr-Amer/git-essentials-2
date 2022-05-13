import * as services from "./service.js";

export const create = async (req, res) => {
  const { name, ISBN, author_id, book_cover_image } = req.body;
  const create = await services.create({
    name,
    ISBN,
    author_id,
    book_cover_image,
  });
  res.send(create);
};

// I don't know if we supposed to use textSearch instead
export const dynamicFind = async (req, res, next) => {
  let query = filterQuery(req.query);

  const find = await services.dynamicFind(query);
  res.send(find);
};

const filterQuery = (reqQuery) => {
  let query = {$or : []};
  if (reqQuery.name) query.$or.push({ $text: { $search: ("\""+reqQuery.name+"\"") } }) ;
  if (reqQuery.ISBN) query.$or.push ({ISBN : reqQuery.ISBN}) ;
  if (reqQuery.author_id) query.$or.push ({ author_id :reqQuery.author_id});
  return query;
};
