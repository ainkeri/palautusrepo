import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const createBlog = vi.fn()

  render(<BlogForm createBlog={createBlog} />)

  const title = screen.getByPlaceholderText('write title here')
  const author = screen.getByPlaceholderText('write author here')
  const url = screen.getByPlaceholderText('write url here')
  const sendButton = screen.getByText('create')

  await user.type(title, 'adding title')
  await user.type(author, 'adding author')
  await user.type(url, 'adding url')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('adding title')
  expect(createBlog.mock.calls[0][0].author).toBe('adding author')
  expect(createBlog.mock.calls[0][0].url).toBe('adding url')
})
