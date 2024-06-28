const mongoose = require("mongoose");
const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const Comment = require("../models/comment");
const jwt = require("jsonwebtoken");
require("express-async-errors");

const middleware = require("../utils/middleware");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({})
    .populate("user", {
      username: 1,
      name: 1,
      id: 1,
    })
    .populate("comments", {
      content: 1,
      id: 1,
    });

  response.json(blogs);
});

blogRouter.post("/", middleware.userExtractor, async (request, response) => {
  const body = request.body;
  const user = request.user;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id,
  });

  if (blog.likes === undefined) {
    blog.likes = 0;
  }

  if (blog.title === undefined) {
    response.status(400).end();
  } else if (blog.url === undefined) {
    response.status(400).end();
  } else {
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    const blogs = await Blog.findById(savedBlog._id).populate("user", {
      username: 1,
      name: 1,
      id: 1,
    });

    response.status(201).json(blogs);
  }
});

blogRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    const blog = await Blog.findById(request.params.id);
    const user = request.user;

    if (blog.user.toString() === user.id.toString()) {
      await Blog.findByIdAndDelete(request.params.id);
      response.status(204).end();
    } else {
      response.status(401).json({ error: "id incorrect" });
    }
  }
);

blogRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  })
    .populate("user", { username: 1, name: 1, id: 1 })
    .populate("comments", { content: 1, id: 1 });

  response.json(updatedBlog);
});

blogRouter.post("/:id/comments", async (request, response) => {
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

module.exports = blogRouter;
