import mongoose from "mongoose";
import { sharedSchema } from "./shared/1_shared_schema.js";
const postSchema = mongoose.Schema({
  ...sharedSchema.obj,
  comments: { type: Number, default: 0 },
});
export default mongoose.model("Post", postSchema);
