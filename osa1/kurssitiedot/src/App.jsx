const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }


  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} />
      <Total part1={part1.exercises} part2={part2.exercises} part3={part3.exercises}/>
    </div>
  )
}

const Header = ({ course }) => {
  console.log(course)
  return (
    <div>
      <h1>{course}</h1>
    </div>
  )
}

const Content = ({ part1, part2, part3 }) => {
  console.log(part1)
  console.log(part2)
  console.log(part3)
  return (
    <div>
      <Part part={part1} />
      <Part part={part2} /> 
      <Part part={part3} /> 
    </div>
  )
}

const Part = ({ part }) => {
  console.log(part)
  return (
    <div>
      <p>{part.name} {part.exercises}</p>
    </div>
  )
}

const Total = ({ part1, part2, part3 }) => {
  console.log(part1)
  console.log(part2)
  console.log(part3)
  return (
    <div>
      <p>Number of exercises {part1 + part2 + part3}</p>
    </div>
  )
}

export default App