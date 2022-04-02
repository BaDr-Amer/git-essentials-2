import mongoose from "mongoose";

const schemaUser = new mongoose.Schema({
  email: String,
  password: String,
});
//schema give the shape & can't use queries
//convert schema to model to reach query sentences
export default mongoose.model("User", schemaUser); //User: document name
