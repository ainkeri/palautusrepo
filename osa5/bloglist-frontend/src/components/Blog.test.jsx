import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'This title is rendered',
    user: {
      id: '239i293823',
      name: 'testingname',
      username: 'testingusername',
    },
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('This title is rendered')

  expect(element).toBeDefined()
})

test('at start blog info is not displayed', async () => {
  const blog = {
    title: 'This title is rendered',
    author: 'This is an author',
    url: 'This is an url',
    likes: 300,
    user: {
      id: '239i293823',
      name: 'testingname',
      username: 'testingusername',
    },
  }

  const { container } = render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const div = container.querySelector('.togglableContent')

  expect(div).not.toHaveStyle('display: none')
})

test('clicking like button twice calls event handler twice', async () => {
  const blog = {
    title: 'This title is rendered',
    author: 'This is an author',
    url: 'This is an url',
    likes: 300,
    user: {
      id: '239i293823',
      name: 'testingname',
      username: 'testingusername',
    },
  }

  const mockHandler = vi.fn()

  render(<Blog blog={blog} addLikeTo={mockHandler} />)

  const user = userEvent.setup()
  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
