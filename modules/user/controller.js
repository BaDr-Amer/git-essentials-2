import User from "../../models/User.js";
import * as service from "./service.js";
import Post from "../../models/Post.js";
import Comment from "../../models/Comment.js";

export const create = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  const user = await service.create({ email, password, firstName, lastName });
  res.send(user);
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await service.login({ email, password });
    res.send({ token });
  } catch (error) {
    res.send(error.message);
  }
};

export const find = async (req, res) => {
  const users = await User.find();
  return res.send(users);
};

export const findById = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  return res.send(user);
  // const user = await User.findById(req.id)
};

export const update = async (req, res) => {
  res.send(req.body);
};

export const remove = async (req, res) => {
  // await User.deleteOne({ _id: req.params.id })
  // res.status(204).send()
  const user = User.findById(req.params.id);
  if (!user) {
    throw new Error("user not found");
  }
  user.delete();
  res.status(204).send();
};

export const addPost = async (req, res) => {
  const { desc } = req.body;
  const user = await User.findOne({ _id: req.userId });
  const post = await service.createPost({ desc, user });
  res.send(post);
};
export const addComment = async (req, res) => {
  const { desc } = req.body;
  const user = await User.findOne({ _id: req.userId });
  const postId = req.params.id;
  const comment = await service.createComment({ desc, user, postId });
  res.send(comment);
};
export const addPostLike = async (req, res) => {
  const user = await User.findOne({ _id: req.userId });
  const refId = req.params.id;
  const kind = "Post";
  const like = await service.createLike({ kind, refId, user });
  await service.addLikePost({ postId: refId });
  res.send(like);
};
export const addCommentLike = async (req, res) => {
  const user = await User.findOne({ _id: req.userId });
  const refId = req.params.id;
  const kind = "Comment";
  const like = await service.createLike({ kind, refId, user });
  await service.addLikeComment({ commentId: refId });
  res.send(like);
};
export const readPosts = async (req, res) => {
  const posts = await Post.find();
  return res.send(posts);
};
export const readComments = async (req, res) => {
  const comments = await Comment.find({ postId: req.params.id });
  return res.send(comments);
};
