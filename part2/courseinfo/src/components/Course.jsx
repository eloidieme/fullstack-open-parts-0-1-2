
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

  export default Course