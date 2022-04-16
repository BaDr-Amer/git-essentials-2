import mongoose from "mongoose";

const schemaUser = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    firstName: String,
    middleName: String,
    lastName: String,
    fullName: String,
    date_of_birth: Date,
  },
  {
    getters: true,
    virtual: true,
  }
);

schemaUser.pre("save", function (next) {
  let fullName = [this.firstName, this.middleName, this.lastName]
    .filter(Boolean)
    .join(" ");
  this.fullName = fullName;

  next();
});
schemaUser
  .virtual("age")
  .set(function (age) {
    let dob = new Date(this.date_of_birth);

    let month_diff = Date.now() - dob.getTime();
    let age_dt = new Date(month_diff);
    let year = age_dt.getUTCFullYear();
    this.age = Math.abs(year - 1970);
  })
  .get(function () {
    return this.age;
  });
schemaUser.post("save", function (doc, next) {
  // send doc to elasticsearch
  next();
});

export default mongoose.model("User", schemaUser);
