const Post = require("../models/Post");

exports.create = (postData) => Post.create(postData);

exports.getAll = () => Post.find();

exports.singlePost = (postId) => Post.findById(postId);

exports.update = (postId, postData) => Post.findByIdAndUpdate(postId, postData);

exports.delete = (postId) => Post.findByIdAndDelete(postId);
