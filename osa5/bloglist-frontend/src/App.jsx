import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Users from './components/Users'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { createBlog, initializeBlogs } from './reducers/blogReducer'
import { setLogin } from './reducers/userReducer'
import { useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from 'react-router-dom'
import { initializeUsers } from './reducers/usersReducer'
import UserBlogs from './components/UserBlogs'
import BlogInfo from './components/BlogInfo'

const App = () => {
  const dispatch = useDispatch()

  const allBlogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setLogin(user))
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)

      dispatch(setLogin(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification('wrong username or password', 5))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload()
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisiblity()
    dispatch(createBlog(blogObject))
    dispatch(
      setNotification(
        `a new blog ${blogObject.title} by ${blogObject.author} added`,
        5
      )
    )
  }

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <Notification />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            data-testid="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            data-testid="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const blogFormRef = useRef()

  const blogForm = () => (
    <div>
      <Notification />
      <div>
        <Togglable buttonLabel="create blog" ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>
      </div>

      <div>
        {allBlogs.map((blog) => (
          <Blog key={blog.id} blog={blog} user={user.username} />
        ))}
      </div>
    </div>
  )

  const padding = {
    padding: 5,
  }

  return (
    <Router>
      <div>
        {user && (
          <Link style={padding} to="/users">
            users
          </Link>
        )}
        {user && (
          <Link style={padding} to="/">
            blogs
          </Link>
        )}
        {user && (
          <span>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </span>
        )}
      </div>
      <div>{user && <h2>blog app</h2>}</div>
      <Routes>
        <Route
          path="/users"
          element={
            <div>{user ? <Users /> : <Navigate replace to="/login" />}</div>
          }
        />
        <Route
          path="/users/:id"
          element={
            <div>{user ? <UserBlogs /> : <Navigate replace to="/login" />}</div>
          }
        />
        <Route
          path="/blogs/:id"
          element={
            <div>
              {user ? (
                <BlogInfo user={user} />
              ) : (
                <Navigate replace to="/login" />
              )}
            </div>
          }
        />
        <Route
          path="/login"
          element={!user ? loginForm() : <Navigate replace to="/" />}
        />
        <Route
          path="/"
          element={user ? blogForm() : <Navigate replace to="/login" />}
        />
      </Routes>
    </Router>
  )
}

export default App
