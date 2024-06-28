import { createSlice } from '@reduxjs/toolkit'
import commentService from '../services/comments'

const commentSlice = createSlice({
  name: 'comments',
  initialState: [],
  reducers: {
    appendComment(state, action) {
      state.push(action.payload)
    },
    setComments(state, action) {
      return action.payload
    },
  },
})

export const { appendComment, setComments } = commentSlice.actions

export const initializeComments = (id) => {
  return async (dispatch) => {
    const comments = await commentService.getAllComments(id)
    dispatch(setComments(comments))
  }
}

export const createComment = (id, content) => {
  return async (dispatch) => {
    const newComment = await commentService.create(id, content)
    dispatch(appendComment(newComment))
  }
}

export default commentSlice.reducer
