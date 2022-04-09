import mongoose from "mongoose";

export const sharedSchema = mongoose.Schema({
  description: { type: String, required: true },
  owner: { type: String, required: true },
  likes: { type: Number, default: 0 },
  postedAt: {
    type: Date,
    default: Date.now(),
  },
});
