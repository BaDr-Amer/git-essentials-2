import * as services from './service.js'

export const create = async (req, res) => {
  const { firstName, lastName, author_image } = req.body;
  const create = await services.create({ firstName, lastName, author_image });
  res.send(create)
};
