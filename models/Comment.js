import mongoose from "mongoose";

const schemaComment= new mongoose.Schema({
  desc: String,
  userId: { type: String, required: true },
  postId: String,
  fullName: String,
  date: String,
  likes: Number,
});

export default mongoose.model("Comment", schemaComment);
