import mongoose from "mongoose";

const schemaUser = new mongoose.Schema({
  desc: String,
  userId: { type: String, required: true },
  postId: String,
  fullName: String,
  date: String,
  likes: Number,
});

export default mongoose.model("Comment", schemaUser);
