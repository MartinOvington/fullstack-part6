import { createSlice } from '@reduxjs/toolkit'

const initialState = ''
let timeoutId

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    createNotification(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return ''
    }
  }
})

export const setNotification = (text, time) => {
  return async dispatch => {
    dispatch(createNotification(text))
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      dispatch(clearNotification())
    }, time * 1000)
  }
}

export const { createNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer