import Post from "../../models/Post.js";
import Like from "../../models/Like.js";

export const create = async ({ content, type, post_id, user_id }) => {
  return await Post.create({ content, type, post_id, user_id });
};

export const findById = async (post_id) => {
  return await Post.findById(post_id);
};

export const remove = async ({ post_id, user_id }) => {
  /**
   * we pass user_id to make sure that every user can remove only the posts that belongs to him.
   */
  return await Post.deleteOne({ post_id, user_id });
};

export const find = async () => {
  return await Post.find().populate(["user_id", "post_id"]);
};

export const findContentsByTheSameUser = async () => {
  const post = await Post.findOne({ user_id: { $exists: true } });
  if (!post) return Promise.reject("no posts found");

  /**
   * this inside findContentsByTheSameUser() refers to post document loaded from database
   */
  return await post.findContentsByTheSameUser();
};

export const like = async ({ post_id, user_id }) => {
  return await Like.create({ post_id, user_id });
};

export const isLikedBefore = async ({ post_id, user_id }) => {
  return await Like.findOne({ post_id, user_id });
};
export const getLikes = async () => {
  return await Like.find();
};
