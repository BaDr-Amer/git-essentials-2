import mongoose from "mongoose";
import Comment from "./../../models/Comment.js";
import * as postController from "./../post/controller.js";
export const getComments = async () => {
  return await Comment.find();
};
export const addComment = async ({ postId, owner, description }) => {
  const comment = await Comment.create({ postId, owner, description });
  const incrementComment = await postController.increaseComment({ postId });
  return { comment, incrementComment };
};
export const getComment = async ({ postId }) => {
  return await Comment.find({ postId });
};
export const increaseCommentLike = async ({ commentId }) => {
  return await Comment.findByIdAndUpdate(
    commentId,
    { $inc: { likes: 1 } },
    { new: true }
  );
};
