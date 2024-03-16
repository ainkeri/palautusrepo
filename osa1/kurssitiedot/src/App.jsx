const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
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

const Content = ({ parts }) => {
  console.log(parts[0])
  console.log(parts[1])
  console.log(parts[2])
  return (
    <div>
      <Part parts={parts[0]} />
      <Part parts={parts[1]} />
      <Part parts={parts[2]} />
    </div>
  )
}

const Part = ({ parts }) => {
  console.log(parts)
  return (
    <div>
      <p>{parts.name} {parts.exercises}</p>
    </div>
  )
}

const Total = ({ parts }) => {
  console.log(parts[0].exercises)
  console.log(parts[1].exercises)
  console.log(parts[2].exercises)
  return (
    <div>
      <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>
    </div>
  )
}

export default App