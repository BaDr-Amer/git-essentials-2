import Like from "../../models/Like.js";
import * as postController from "../post/controller.js";
import * as commentController from "../comment/controller.js";

export const getLikes = async ({ id }) => {
  return await Like.findById(id);
};
export const getLike = async ({ id }) => {
  return await Like.find({ id });
};
export const addLike = async ({ owner, id, likedItem }) => {
  try {
    const like = await Like.create({ owner, id, likedItem });
    if (likedItem === "Post") {
      const incrementPostLikes = await postController.increaseLike({
        postId: id,
      });
      return { like, incrementPostLikes };
    } else if (likedItem === "Comment") {
      const incrementCommentLikes = await commentController.increaseCommentLike(
        {
          commentId: id,
        }
      );
      return { like, incrementCommentLikes };
    }
  } catch (err) {
    return err.message;
  }
};
