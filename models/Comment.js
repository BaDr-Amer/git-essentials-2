import { sharedSchema } from "./shared/1_shared_schema.js";
import mongoose from "mongoose";
const commentSchema = mongoose.Schema({
  ...sharedSchema.obj,
  postId: { type: String, required: true },
});
export default mongoose.model("Comment", commentSchema);
