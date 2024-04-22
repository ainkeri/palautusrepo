const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
      title: "This is a title",
      author: "This is an author",
      url: "This is an url",
      likes: 100,
    },
    {
      title: "This is a title 2",
      author: "This is an author 2",
      url: "This is an url 2",
      likes: 200,
    },
  ]

const nonExistingId = async () => {
    const blog = new Blog({
        title: "Blog",
        author: "Author",
        url: "Url",
        likes: 20
    })

    await blog.save()
    await blog.deleteOne()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs,
    nonExistingId,
    blogsInDb,
    usersInDb,
}