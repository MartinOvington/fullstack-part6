import { connect } from 'react-redux'
import { incVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

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

const AnecdoteList = (props) => {
  return (
    <div>
      {[...props.anecdotes]
        .sort((a, b) => b.votes - a.votes)
        .filter((anecdote) => anecdote.content.toLowerCase()
          .includes(props.filter.toLowerCase()))
        .map(anecdote =>
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleVote={() => {
              props.incVote(anecdote)
              props.setNotification("you vote '" + anecdote.content + "'", 5)
            }}
          />
        )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  incVote,
  setNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

