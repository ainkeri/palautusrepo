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
      return action.payload
    }
  }
})

export const { notificationMessage, clearMessage } = notificationSlice.actions
export default notificationSlice.reducer