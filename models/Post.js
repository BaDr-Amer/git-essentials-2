import mongoose from "mongoose";

const schemaPost = new mongoose.Schema({
  desc: String,
  userId: { type: String, required: true },
  fullName: String,
  date: String,
  likes: Number,
});

export default mongoose.model("Post", schemaPost);
