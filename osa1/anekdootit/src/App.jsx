import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(10+1).join('0').split('').map(parseFloat))

  const handleAnecdoteClick = () => {
    const setAnecdote = Math.floor(Math.random() * anecdotes.length)
    setSelected(setAnecdote)
  }

  const handleVoteClick = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  return (
    <div>
      {anecdotes[selected]}
      <div>
        <p>has {votes[selected]} votes</p>
        <button onClick={(handleVoteClick)}>vote</button>
        <button onClick={(handleAnecdoteClick)}>next anecdote</button>
      </div>
    </div>
  )
}

export default App