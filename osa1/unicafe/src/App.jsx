import { useState } from 'react'

const Statistics = (props) => {
  return (
    <div>
      <h2>statistics</h2>
      <div>good {props.good}</div>
      <div>neutral {props.neutral}</div>
      <div>bad {props.bad}</div>
      <div>all {props.all}</div>
      <div>average {props.average}</div>
      <div>positive {props.positive} %</div>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    const updatedAll = updatedGood + neutral + bad
    setAll(updatedAll)
    setAverage((updatedGood - bad)/updatedAll)
    setPositive(updatedGood/updatedAll*100)
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    const updatedAll = good + updatedNeutral + bad
    setAll(updatedAll)
    setAverage((good - bad)/updatedAll)
    setPositive(good/updatedAll*100)
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    const updatedAll = good + neutral + updatedBad
    setAll(updatedAll)
    setAverage((good - updatedBad)/updatedAll)
    setPositive(good/updatedAll*100)
  }

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive}/>
    </div>
  )
}

export default App