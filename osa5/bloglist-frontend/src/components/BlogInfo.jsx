import { useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { setLikes, removeBlog } from '../reducers/blogReducer'
import { createComment, initializeComments } from '../reducers/commentReducer'

const BlogInfo = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const blogs = useSelector((state) => state.blogs)
  const id = useParams().id
  const blog = blogs.find((b) => b.id === id)

  const userNow = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeComments(id))
  }, [])

  const comments = useSelector((state) => state.comments)

  if (!blog) {
    return null
  }

  const addLike = () => {
    dispatch(setLikes(blog.id, blogs))
  }

  const commentBlog = (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    event.target.comment.value = ''
    dispatch(createComment(blog.id, { content: comment }))
  }

  const deleteBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(removeBlog(blog.id))
      navigate('/')
    }
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href="url">{blog.url}</a>
      <div>
        {blog.likes} likes
        <button onClick={addLike}>like</button>
      </div>
      <div>added by {blog.user.username}</div>
      <div>
        {userNow.username === blog.user.username && (
          <button onClick={deleteBlog}>remove</button>
        )}
      </div>
      <div>
        <h3>comments</h3>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </div>
      <form onSubmit={commentBlog}>
        <div>
          <input name="comment" />
          <button type="submit">comment</button>
        </div>
      </form>
    </div>
  )
}

export default BlogInfo
