import * as service from "./service.js";
import * as commentController from "../../modules/comment/controller.js";
import * as likeController from "../like/controller.js";
export const getPosts = async (req, res) => {
  const posts = await service.getPosts();
  res.send(posts);
};
export const getPost = async (req, res) => {
  const { postId } = req.params;
  const post = await service.getPost({ postId });
  res.send(post);
};
export const createPost = async (req, res) => {
  const { description, owner } = req.body;
  const post = await service.createPost({ description, owner });
  res.send(post);
};
export const increaseLike = async ({ postId }) => {
  return await service.increaseLike({ postId });
};
export const increaseComment = async ({ postId }) => {
  return await service.increaseComment({ postId });
};
export const getComment = async (req, res) => {
  const { postId } = req.params;
  const comments = await commentController.getPostComments({ postId });
  res.send(comments);
};
export const getLikes = async (req, res) => {
  const { postId } = req.params;
  const likes = await likeController.getLike({ id: postId });
  res.send(likes);
};
