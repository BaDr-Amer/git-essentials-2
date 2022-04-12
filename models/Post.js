import mongoose from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";
import paginate from "mongoose-paginate-v2";

const contentSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    post_id: { type: mongoose.Schema.Types.ObjectId, ref: "Content" },
  },
  {
    timestamps: true,
  }
);
contentSchema.plugin(paginate);
contentSchema.plugin(aggregatePaginate);
contentSchema.static.findByUser = async function (user_id) {
  /**
   * this keyword here refers to model name => Content.
   * it's equivalent to:
   * return await Content.find({ user_id })
   */
  return await this.find({ user_id });
};

contentSchema.methods.findContentsByTheSameUser = async function () {
  /**
   * this keyword here refers to document leaded in memory.
   */
  return await mongoose.model("Content").find({ user_id: this.user_id });
};

export default mongoose.model("Content", contentSchema);
