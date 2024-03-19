const Course = ({ courses }) => {
  console.log(courses)
  return (
    <div>
      <h1>Web development curriculum</h1>
      <Header course={courses} />
      <Content parts={courses.parts} />
      <Total parts={courses.parts} />
    </div>
  )
}

const Header = ({ course }) => {
  console.log(course.name)
  return (
    <div>
      <h2>{course.name}</h2>
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
      <p><b>total of {total} exercises</b></p>
    </div>
  )
}

export default Course