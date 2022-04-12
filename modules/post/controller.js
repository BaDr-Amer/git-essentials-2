import * as service from "./service.js";
import Post from "../../models/Post.js";
export const create = async (req, res) => {
  const { content, type, post_id } = req.body;
  const post = await service.create({
    content,
    type,
    post_id,
    user_id: req.userId,
  });
  res.status(201).send(post);
};

export const find = async (req, res) => {
  const options = {
    page: 1,
    limit: 10,
  };
  var aggregate = Post.aggregate();
  let result = await Post.aggregatePaginate(aggregate, options);
  return res.send(result);
};

export const findById = async (req, res) => {
  const post = await service.findById(req.params.id);
  if (!post) throw new Error(`No post found for ${req.params.id}`);
  return res.send(post);
};

export const remove = async (req, res) => {
  const result = await service.remove({
    post_id: req.params.id,
    user_id: req.userId,
  });
  if (!result.deletedCount)
    throw new Error(`No post found for ${req.params.id}`);
  return res.status(204).send(result);
};

export const findContentsByTheSameUser = async (req, res) => {
  const postsByTheSameUser = await service.findContentsByTheSameUser();
  return res.send(postsByTheSameUser);
};

export const like = async (req, res) => {
  const { id } = req.params;
  const like = await service.like({ post_id: id, user_id: req.userId });
  res.status(201).send(like);
};
export const getLikes = async (req, res) => {
  const likes = await service.getLikes();
  res.send(likes);
};
