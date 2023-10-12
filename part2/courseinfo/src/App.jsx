const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises} 
    </p>
  )
}

const Content = (props) => {
  return (
    <>
      {props.parts.map(part => <Part key = {part.id} part = {part.name} exercises = {part.exercises} />)}
    </>
  )
}

const Total = (props) => {
  return (
    <b>total of {props.parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)} exercises</b>
  )
}

const Course = ({ courses }) => {
  return (courses.map(course => 
    <div key = {course.id}>
      <Header course = {course.name}/>
      <Content parts = {course.parts}/>
      <Total parts = {course.parts}/>
    </div>
    )
  )
}

const App = () => {
  const courses = [
    {
      id: 1,
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id : 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id : 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id : 3
        }
      ]
    },
    {
      id: 2,
      name: 'Node.js',
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id : 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id : 2
        }
      ]
    }

  ]

  return <Course courses = {courses} />
}

export default App
