import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({ blog, user, addLikeTo }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  
  const toggleVisiblity = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleVisiblity}>view</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleVisiblity}>hide</button>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button onClick={addLikeTo}>like</button></div>
        {user.name}
      </div>
    </div>  
)}

export default Blog

