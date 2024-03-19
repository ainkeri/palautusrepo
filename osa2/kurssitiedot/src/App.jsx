const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
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
      },
      {
        name: 'Redux',
        exercises: 11
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

const Course = ({ course }) => {
  console.log(course)
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = ({ course }) => {
  console.log(course.name)
  return (
    <div>
      <h1>{course.name}</h1>
    </div>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part, id) =>
        <Part key={id} part={part} />
      )}
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

const Total = ({ parts }) => {
  const total = parts.reduce((sum, parts) => sum + parts.exercises, 0)
  return (
    <div>
      <p><b>total of {total}</b></p>
    </div>
  )
}

export default App