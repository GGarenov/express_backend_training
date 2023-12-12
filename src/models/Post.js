const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  damages: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    match: [/^https?:\/\/.+/, "Provide valid creature image link!"],
  },
  description: {
    type: String,
    required: true,
  },
  production: {
    type: Number,
    required: true,
  },
  exploitation: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  buyingList: {
    type: Array,
    required: true,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
