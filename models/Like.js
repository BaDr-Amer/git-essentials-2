import mongoose from "mongoose";

const likeSchema = mongoose.Schema({
  owner: { type: String, required: true },
  id: { type: String, required: true },
  likedItem: { type: String, required: true },
});
likeSchema.index({ owner: 1, id: 1 }, { unique: true });
export default mongoose.model("like", likeSchema);
