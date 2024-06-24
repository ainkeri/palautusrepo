import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    likeBlog(state, action) {
      const blogToLike = action.payload
      const id = blogToLike.id

      return state.map((blog) => (blog.id !== id ? blog : blogToLike))
    },
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
  },
})

export const { appendBlog, setBlogs, likeBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
  }
}

export const setLikes = (id) => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    const wantedBlog = blogs.find((b) => b.id === id)
    const likedBlog = { ...wantedBlog, likes: wantedBlog.likes + 1 }
    const updatedBlog = await blogService.update(id, likedBlog)
    dispatch(likeBlog(updatedBlog))
  }
}

export default blogSlice.reducer
