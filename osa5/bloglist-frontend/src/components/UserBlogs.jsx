import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const UserBlogs = () => {
  const users = useSelector((state) => state.users)
  const id = useParams().id
  const user = users.find((u) => u.id === id)

  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <div>
        {user.blogs.map((b) => (
          <li key={b.id}>{b.title}</li>
        ))}
      </div>
    </div>
  )
}

export default UserBlogs
