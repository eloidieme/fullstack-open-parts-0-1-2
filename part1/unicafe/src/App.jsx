import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value} {props.suffix}</td>
    </tr>
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
      <table>
        <tbody>
          <StatisticLine text = "good" value = {props.good} />
          <StatisticLine text = "neutral" value = {props.neutral} />
          <StatisticLine text = "bad" value = {props.bad} />
          <StatisticLine text = "total" value = {props.good + props.neutral + props.bad} />
          <StatisticLine text = "average" value = {(props.good*1 + props.bad*(-1))/(props.good + props.bad + props.neutral)} />
          <StatisticLine text = "positive" value = {100*props.good/(props.good+props.neutral+props.bad)} suffix = "%" /> 
        </tbody>
      </table>
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
