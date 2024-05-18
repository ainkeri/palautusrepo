import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newTitle, setTitle] = useState('')
  const [newAuthor, setAuthor] = useState('')
  const [newUrl, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [rejectedMessage, setRejectedMessage] = useState(null)
  const [newBlogVisible, setNewBlogVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setRejectedMessage('wrong username or password')
      console.log(errorMessage)
      setTimeout(() => {
        setRejectedMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload()
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisiblity()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
         setBlogs(blogs.concat(returnedBlog))
         setErrorMessage(
          `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
         )
         setTimeout(() => {
         setErrorMessage(null)
         }, 5000)
       })
  }

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <Notification message={errorMessage} rejected={rejectedMessage} />
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )

  const blogFormRef = useRef()

  const blogForm = () => (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} rejected={rejectedMessage}/>
      <div>
        <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      </div>

      <div>
        <Togglable buttonLabel='new blog' ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>
      </div>

      <div>
        {blogs.map(blog => 
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  )

  return (
    <div>
      {!user && loginForm()}
      {user && blogForm()}
    </div>
  )
}

export default App