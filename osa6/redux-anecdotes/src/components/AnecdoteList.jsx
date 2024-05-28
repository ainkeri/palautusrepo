import { useDispatch, useSelector } from "react-redux"
import { voteToAnecdote } from "../reducers/anecdoteReducer"
import { notificationMessage, clearMessage } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if ( filter === '' ) {
      return anecdotes
    }
    return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  })

  const vote = async (anecdote) => {
    dispatch(voteToAnecdote(anecdote))

    dispatch(notificationMessage(`you voted '${anecdote.content}'`))
    setTimeout(() => {
      dispatch(clearMessage(''))
    }, 5000)
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList