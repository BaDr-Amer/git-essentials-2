import Post from "../../models/Post.js";
export const getPosts = async () => {
  const posts = await Post.find();
  return posts;
};
export const getPost = async ({ postId }) => {
  const post = await Post.findById(postId);
  return post;
};

export const createPost = async ({ description, owner }) => {
  const post = await Post.create({ description, owner });
  return post;
};
export const increaseLike = async ({ postId }) => {
  return await Post.findByIdAndUpdate(
    postId,
    { $inc: { likes: 1 } },
    { new: true }
  );
};
export const increaseComment = async ({ postId }) => {
  return await Post.findByIdAndUpdate(
    postId,
    { $inc: { comments: 1 } },
    { new: true }
  );
};
