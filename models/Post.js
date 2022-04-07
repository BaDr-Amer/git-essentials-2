import mongoose from "mongoose";

const schemaUser = new mongoose.Schema({
  desc: String,
  userId: { type: String, required: true },
  fullName: String,
  date: String,
  likes: Number,
});

export default mongoose.model("Post", schemaUser);
