import { useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { setLikes, removeBlog } from '../reducers/blogReducer'
import { createComment, initializeComments } from '../reducers/commentReducer'
import { Form, Button } from 'react-bootstrap'

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
    <div className="container">
      <h2>{blog.title}</h2>
      <a href="url">{blog.url}</a>
      <div>
        {blog.likes} likes
        <Button variant="light" onClick={addLike}>
          like
        </Button>
      </div>
      <div>added by {blog.user.username}</div>
      <div>
        {userNow.username === blog.user.username && (
          <Button variant="dark" onClick={deleteBlog}>
            remove
          </Button>
        )}
      </div>
      <p></p>
      <div>
        <h3>comments</h3>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </div>
      <p></p>
      <Form onSubmit={commentBlog}>
        <Form.Group className="align-items-center">
          <Form.Control name="comment" />
        </Form.Group>
        <p></p>
        <Button variant="primary" type="submit">
          send
        </Button>
      </Form>
    </div>
  )
}

export default BlogInfo
