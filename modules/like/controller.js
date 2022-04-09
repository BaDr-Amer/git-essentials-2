import * as service from "./service.js";
export const getLikes = async (req, res) => {
  const likes = await service.getLikes();
  res.send(likes);
};
export const getLike = async ({ id }) => {
  const likes = await service.getLike({ id });
  return likes;
};
export const addLike = async (req, res) => {
  const { owner, id, likedItem } = req.body;

  const like = await service.addLike({ owner, id, likedItem });
  res.send(like);
};
