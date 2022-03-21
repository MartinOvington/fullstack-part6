import { useDispatch, useSelector } from 'react-redux'
import { incVote } from '../reducers/anecdoteReducer'
import { createNotification, clearNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <div>
      {anecdote.content}
      <div>
        has {anecdote.votes}
        <button onClick={handleVote}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ anecdotes }) => anecdotes)
  const filter = useSelector(({ filter }) => filter)
  return (
    <div>
      {[...anecdotes]
        .sort((a, b) => b.votes - a.votes)
        .filter((anecdote) => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
        .map(anecdote =>
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleVote={() => {
              dispatch(incVote(anecdote.id))
              dispatch(createNotification("you vote '" + anecdote.content + "'"))
              setTimeout(() => {
                dispatch(clearNotification())
              }, 5000)
            }}
          />
        )}
    </div>
  )
}

export default AnecdoteList

