import mongoose from "mongoose";
const schemauser = new mongoose.Schema({
  email: String,
  password: String,
}); //عشان تقيد الادخال بمعنا عشان الاب ما يصير يضف على راحنه بحدد شو احط في الدتا
export default mongoose.model("fd", schemauser); //user name of colection in data base
