const Post = require("../models/Post");

exports.create = (postData) => Post.create(postData);

exports.getAll = () => Post.find();

exports.singlePost = (postId) => Post.findById(postId);

exports.update = (postId, postData) => Post.findByIdAndUpdate(postId, postData);

exports.delete = (postId) => Post.findByIdAndDelete(postId);

exports.addBuyToPost = async (postId, userId) => {
  const post = await this.singlePost(postId);
  const isExistinginBuyList = post.buyingList.some((b) => b?.toString() === userId);

  if (isExistinginBuyList) {
    return;
  }

  post.buyingList.push(userId);
  return post.save();
};
