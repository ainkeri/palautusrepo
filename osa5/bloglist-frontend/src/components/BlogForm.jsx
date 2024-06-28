import { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control
            data-testid="title"
            value={newTitle}
            onChange={(event) => setNewTitle(event.target.value)}
            placeholder="write title here"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>author:</Form.Label>
          <Form.Control
            data-testid="author"
            value={newAuthor}
            onChange={(event) => setNewAuthor(event.target.value)}
            placeholder="write author here"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>url:</Form.Label>
          <Form.Control
            data-testid="url"
            value={newUrl}
            onChange={(event) => setNewUrl(event.target.value)}
            placeholder="write url here"
          />
        </Form.Group>
        <p></p>
        <Button variant="primary" type="submit">
          create
        </Button>
      </Form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
