import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistics = (props) => {
  if (props.good + props.neutral + props.bad === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <>
      <h1>statistics</h1>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
      <p>total {props.good + props.neutral + props.bad}</p>
      <p>average {(props.good*1 + props.bad*(-1))/(props.good + props.bad + props.neutral)}</p>
      <p>positive {100*props.good/(props.good+props.neutral+props.bad)} %</p>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text = 'good'/>
      <Button handleClick={() => setNeutral(neutral + 1)} text = 'neutral'/>
      <Button handleClick={() => setBad(bad + 1)} text = 'bad'/>
      <Statistics good = {good} neutral = {neutral} bad = {bad}/>
    </div>
  )
}

export default App
