import User from "../../models/User.js";
import Post from "../../models/Post.js";
import Comment from "../../models/Comment.js";
import Like from "../../models/Like.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs";

export const create = async ({ email, password, firstName, lastName }) => {
  const hash = await bcrypt.hash(password, 3);
  return await User.create({ email, password: hash, firstName, lastName });
};

export const login = async ({ email, password }) => {
  const user = await findByEmail(email);
  if (!user) return Promise.reject("incorrect email or password");

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) return Promise.reject("incorrect email or password");
  const token = jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    fs.readFileSync("./privateKey"),
    { algorithm: "RS256" }
  );

  return token;
};

export const findByEmail = async (email) => {
  return await User.findOne({ email });
};
export const createPost = async ({ desc, user }) => {
  return await Post.create({
    desc,
    userId: user._id,
    fullName: user.fullName,
    likes: 0,
    date: new Date(Date.now()).toISOString(),
  });
};
export const createComment = async ({ desc, user, postId }) => {
  return await Comment.create({
    desc,
    userId: user._id,
    postId: postId,
    fullName: user.fullName,
    likes: 0,
    date: new Date(Date.now()).toISOString(),
  });
};
export const createLike = async ({ kind, refId, user }) => {
  return await Like.create({
    kind,
    refId,
    userId: user._id,
    fullName: user.fullName,
    date: new Date(Date.now()).toISOString(),
  });
};
export const addLikePost = async ({ postId }) => {
  const post = await Post.findOne({ _id: postId });
  const filter = { _id: postId };
  const options = {};
  const updateDoc = {
    $set: {
      likes: post.likes + 1,
    },
  };
  return await Post.updateOne(filter, updateDoc, options);
};
export const addLikeComment = async ({ commentId }) => {
  const comment = await Comment.findOne({ _id: commentId });
  const filter = { _id: commentId };
  const options = {};
  const updateDoc = {
    $set: {
      likes: comment.likes + 1,
    },
  };
  return await Comment.updateOne(filter, updateDoc, options);
};
