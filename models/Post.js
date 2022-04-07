import mongoose from "mongoose";

schemaPost = mongoose.Schema({
  body: { type: String, require: true },
  comments: [],
  likes: [],
});
export default mongoose.model("Post", schemaPost);
