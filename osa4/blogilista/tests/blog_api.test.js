const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const bcrypt = require('bcryptjs')
const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
  await User.deleteMany({})

  const newUser = {
    username: 'InksuPinks',
    name: 'Inkeri Ahlström',
    password: 'salasana'
  }

  await api
    .post('/api/users')
    .set('Content-Type', 'application/json')
    .send(newUser)
    .expect(201)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('a blog can be added', async () => {
  const userLogin = {
    username: 'InksuPinks',
    password: 'salasana'
  }

  const result = await api
    .post('/api/login')
    .send(userLogin)

  const token = result.body.token

  const newBlog = {
    title: 'Blogging is cool',
    author: 'Blogger',
    url: 'this is url',
    likes: 20
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
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
  const userLogin = {
    username: 'InksuPinks',
    password: 'salasana'
  }

  const result = await api
    .post('/api/login')
    .send(userLogin)

  const token = result.body.token

  const newBlog = {
    title: 'There is a title',
    author: 'There is an author',
    url: 'There is an url'
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  const response = await api.get('/api/blogs')

  const addedBlog = response.body[response.body.length - 1].likes

  assert.strictEqual(addedBlog, 0)
})

test('blog without title is not added', async () => {
  const userLogin = {
    username: 'InksuPinks',
    password: 'salasana'
  }

  const result = await api
    .post('/api/login')
    .send(userLogin)

  const token = result.body.token

  const newBlog = {
    author: "Author 1",
    url: "url",
    likes: 20
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(400)
  
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test ('blog without url is not added', async () => {
  const userLogin = {
    username: 'InksuPinks',
    password: 'salasana'
  }

  const result = await api
    .post('/api/login')
    .send(userLogin)

  const token = result.body.token

  const newBlog = {
    title: "Title",
    author: "Author 2",
    likes: 300
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(400)
  
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test ('a blog is not added without token', async () => {
  const newBlog = {
    title: 'This is title',
    author: 'This is author',
    url: 'This is url',
    likes: 2000
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)

  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('a blog can be deleted', async () => {
  const userLogin = {
    username: 'InksuPinks',
    password: 'salasana'
  }

  const result = await api
    .post('/api/login')
    .send(userLogin)

  const token = result.body.token

  const newBlog = {
    title: 'Blogging is cool',
    author: 'Blogger',
    url: 'this is url',
    likes: 20
  }

  const deleteId = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  await api
    .delete(`/api/blogs/${deleteId.body.id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(204)
  
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('a blog can be updated', async () => {
  const userLogin = {
    username: 'InksuPinks',
    password: 'salasana'
  }

  const result = await api
    .post('/api/login')
    .send(userLogin)

  const token = result.body.token
  
  const newBlog = {
    title: "Title",
    author: "Author 2",
    url: "moi",
    likes: 300
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
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

  const result2 = await api.get(`/api/blogs`)

  const updated = result2.body[result2.body.length - 1].likes

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

  test('creation fails with proper statuscode and message if username is already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('expected `username` to be unique'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if username length is below 3', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mo',
      name: 'moikka',
      password: 'shhhh',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    
      const usersAtEnd = await helper.usersInDb()
      assert(result.body.error.includes('is shorter than the minimum allowed length (3).'))

      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if username is not defined', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'moii',
      password: 'miau',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    
    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('`username` is required.'))
    
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if password is not defined', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'heippa',
      name: 'moikuuuu',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    
    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(result.body.error, 'password missing')

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if password length is below 3', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'heippa',
      name: 'moikuuuu',
      password: 'kk'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    
    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(result.body.error, 'password minimum length is 3')

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

})


after(async () => {
  await mongoose.connection.close()
})