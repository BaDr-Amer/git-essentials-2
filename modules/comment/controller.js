import * as service from "./service.js";
import * as likeController from "../like/controller.js";
export const getComments = async (req, res) => {
  const comments = await service.getComments();
  res.send(comments);
};
export const getComment = async (req, res) => {
  const { postId } = req.body;
  const comment = await service.getComment({ postId });
  res.send(comment);
};
export const getPostComments = async ({ postId }) => {
  return await service.getComment({ postId });
};
export const addComment = async (req, res) => {
  const { postId, owner, description } = req.body;
  const comment = await service.addComment({ postId, owner, description });
  res.send(comment);
};

export const increaseCommentLike = async ({ commentId }) => {
  return await service.increaseCommentLike({ commentId });
};
export const getLikes = async (req, res) => {
  const { commentId } = req.params;
  const likes = await likeController.getLike({ id: commentId });
  res.send(likes);
};
