const mongoose = require("mongoose");
const commentRouter = require("express").Router({ mergeParams: true });
const Comment = require("../models/comment");
require("express-async-errors");

commentRouter.get("/", async (request, response) => {
  const id = request.params.id;
  const comments = await Comment.find({ blog: id }).populate("blog", {
    id: 1,
  });

  response.json(comments);
});

module.exports = commentRouter;
