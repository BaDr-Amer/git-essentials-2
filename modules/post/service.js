import Post from "../../models/Post.js";
import Like from "../../models/Like.js";
import { sub } from "date-fns";
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
  const post = await Post.findOneWithDeleted({ _id: post_id });
  if (!post) {
    throw new Error("No post");
  }
  return await post.delete();
  // return await Post.deleteOne({ post_id, user_id })
};

export const find = async (query) => {
  const { offset = 0, limit = 10 } = query;
  const options = {
    offset,
    limit,
  };
  return await Post.paginate({}, options); //.populate(['user_id', 'post_id'])
};
export const findLikes = async () => {
  const date = sub(new Date(), {
    months: 1,
  });

  return await Like.aggregate(
    {
      createdAt: { $gte: ISODate(date) },
    },
    {
      from: "users",
      localField: "user_id",
      foreignField: "_id",
      as: "user",
    },
    {
      path: "$user",
    },
    {
      Age: { $gt: 20, $lt: 30 },
    }
  );
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
