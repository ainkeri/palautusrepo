const blogRouter = require('express').Router()
const mongoose = require('mongoose')
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
  })
  
blogRouter.post('/', async (request, response) => {
   const blog = new Blog(request.body)

   if (blog.likes === undefined) {
     blog.likes = 0
   }
  
   const savedBlog = await blog.save()

   response.status(201).json(savedBlog)
})

module.exports = blogRouter