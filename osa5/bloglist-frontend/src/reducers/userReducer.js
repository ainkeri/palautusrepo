import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: '',
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  },
})

export const { setUser } = userSlice.actions

export const setLogin = (user) => {
  return async (dispatch) => {
    dispatch(setUser(user))
  }
}

export default userSlice.reducer
