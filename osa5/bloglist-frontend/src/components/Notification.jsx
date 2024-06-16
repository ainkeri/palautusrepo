import { useSelector } from 'react-redux'

const Notification = () => {
  const notif = useSelector((state) => state.notification)

  if (notif.length === 0) {
    return null
  }
  console.log(notif)

  const success = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  }

  const fail = {
    color: 'red',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  }

  if (notif === 'wrong username or password')
    return <div style={fail}>{notif}</div>

  return <div style={success}>{notif}</div>
}

export default Notification
