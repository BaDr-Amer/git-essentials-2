import mongoose from "mongoose";

const schemaLike = new mongoose.Schema({
  userId: { type: String, required: true },
  refId: String,
  fullName: String,
  date: String,
  kind: { type: String, enum: ["Comment", "Post"] },
});
 

export default mongoose.model("Like", schemaLike);
