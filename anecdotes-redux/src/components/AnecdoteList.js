import { useDispatch, useSelector } from 'react-redux'
import { incVote } from '../reducers/anecdoteReducer'

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
  return (
    <div>
      {[...anecdotes].sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleVote={() =>
              dispatch(incVote(anecdote.id))
            }
          />
        )}
    </div>
  )
}

export default AnecdoteList

