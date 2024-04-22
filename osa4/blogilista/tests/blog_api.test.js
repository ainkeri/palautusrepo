const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('a blog can be added', async () => {
  const newBlog = {
    title: 'Blogging is cool',
    author: 'Blogger',
    url: 'this is url',
    likes: 20
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)

  assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)

  assert(titles.includes('Blogging is cool'))
})

test('id is defined', async () => {
  const response = await api.get('/api/blogs')

  const keys = Object.keys(response.body[0])

  assert(keys.includes('id'))
})

test('blog without likes set to zero', async () => {
  const newBlog = {
    title: 'There is a title',
    author: 'There is an author',
    url: 'There is an url'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
  
  const response = await api.get('/api/blogs')

  const addedBlog = response.body[response.body.length - 1].likes

  assert.strictEqual(addedBlog, 0)
})

test('blog without title is not added', async () => {
  const newBlog = {
    author: "Author 1",
    url: "url",
    likes: 20
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
  
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test ('blog without url is not added', async () => {
  const newBlog = {
    title: "Title",
    author: "Author 2",
    likes: 300
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
  
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('a blog can be deleted', async () => {
  const deleteId = await api.get('/api/blogs')

  await api
    .delete(`/api/blogs/${deleteId.body[0].id}`)
    .expect(204)
  
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length - 1)
})

test('a blog can be updated', async () => {
  const newBlog = {
    title: "Title",
    author: "Author 2",
    url: "moi",
    likes: 300
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
  
  const response = await api.get('/api/blogs')

  const updateId = response.body[response.body.length - 1].id

  const updateBlog = {
    title: "Title",
    author: "Author 2",
    url: "moi",
    likes: 10000
  }

  await api
    .put(`/api/blogs/${updateId}`)
    .send(updateBlog)
    .expect(200)

  const result = await api.get(`/api/blogs`)

  const updated = result.body[result.body.length - 1].likes

  assert.strictEqual(updated, 10000)
})

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'inksupinksu',
      name: 'Inkeri Ahlström',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })
})


after(async () => {
  await mongoose.connection.close()
})