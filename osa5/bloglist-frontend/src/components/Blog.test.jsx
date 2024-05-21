import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'This title is rendered',
    user: {
      id: '239i293823',
      name: 'testingname',
      username: 'testingusername'
    }
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('This title is rendered')
  expect(element).toBeDefined()
})