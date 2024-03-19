import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>

)

const Statistics = (props) => {
  if (props.most === 0) {
    return (
      <div>
        <h2>Anecdote with most votes</h2>
      </div>
    )
  }

  return (
    <div>
      <h2>Anecdote with most votes</h2>
      <div>{props.anecdotes[props.index]}</div>
      <div>has {props.most} votes</div>
    </div>
  )
}

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
  const [votes, setVotes] = useState(new Array(anecdotes.length + 1).join('0').split('').map(parseFloat))
  const [most, setMost] = useState(0)
  const [index, setIndex] = useState(0)

  const handleAnecdoteClick = () => {
    const setAnecdote = Math.floor(Math.random() * anecdotes.length)
    setSelected(setAnecdote)
  }

  const handleVoteClick = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
    const updatedMost = Math.max(...newVotes)
    setMost(updatedMost)
    setIndex(newVotes.indexOf(updatedMost))
  }


  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}
      <div>
        <div>has {votes[selected]} votes</div>
        <Button handleClick={handleVoteClick} text='vote'/>
        <Button handleClick={handleAnecdoteClick} text='next anecdote'/>
        <Statistics most={most} anecdotes={anecdotes} index={index}/>
      </div>
    </div>
  )
}

export default App