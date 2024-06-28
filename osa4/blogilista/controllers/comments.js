const mongoose = require("mongoose");
const commentRouter = require("express").Router({ mergeParams: true });
const Comment = require("../models/comment");
const Blog = require("../models/blog");
require("express-async-errors");

commentRouter.get("/", async (request, response) => {
  const id = request.params.id;
  const comments = await Comment.find({ blog: id }).populate("blog", {
    id: 1,
  });

  response.json(comments);
});

commentRouter.post("/", async (request, response) => {
  const body = request.body;
  const blog = await Blog.findById(request.params.id);

  const comment = new Comment({
    content: body.content,
    blog: blog._id,
  });

  if (body.content === undefined) {
    response.status(400).end();
  }

  const savedComment = await comment.save();

  blog.comments = blog.comments.concat(savedComment._id);
  await blog.save();

  response.status(201).json(comment);
});

module.exports = commentRouter;
