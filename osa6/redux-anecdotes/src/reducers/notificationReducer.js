import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    notificationMessage (state, action) {
      return action.payload
    },

    clearMessage (state, action) {
      return ''
    }
  }
})

export const { notificationMessage, clearMessage } = notificationSlice.actions

export const setNotification = (message, timeout) => {
  return async dispatch => {
    dispatch(notificationMessage(message))
    setTimeout(() => {
      dispatch(clearMessage())
    }, timeout * 1000)
  }
}

export default notificationSlice.reducer