import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    updateAnecdote(state, action) {
      const id = action.payload.id
      return state.map(anecdote => 
        anecdote.id !== id ? anecdote : action.payload
      )
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})


export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const incVote = anecdote => {
  const changedAnecdote = {
    ...anecdote,
    votes: anecdote.votes + 1
  }
  return async dispatch => {
    await anecdoteService.update(changedAnecdote)
    dispatch(updateAnecdote(changedAnecdote))
  }
}

export const { appendAnecdote, setAnecdotes, updateAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer