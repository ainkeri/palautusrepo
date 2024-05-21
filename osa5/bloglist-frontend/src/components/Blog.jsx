import { useState } from 'react'

const Blog = ({ blog, blogAdder, user, addLikeTo, removeBlogFrom }) => {
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

  const deletionButton = () => (
    <div>
      <button onClick={removeBlogFrom}>remove</button>
    </div>
  )

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
        <div>
          likes {blog.likes}
          <button onClick={addLikeTo}>like</button>
        </div>
        {blogAdder.name}
        {user === blogAdder.username && deletionButton()}
      </div>
    </div>
  )}

export default Blog

