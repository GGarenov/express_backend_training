const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.virtual("repassword").set(function (value) {
  if (value !== this.password) {
    throw new Error("Password missmatch!");
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
