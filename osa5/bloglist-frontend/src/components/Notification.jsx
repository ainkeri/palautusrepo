import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notif = useSelector((state) => state.notification)

  if (notif.length === 0) {
    return null
  }

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
    return (
      <Alert variant="fail" style={fail}>
        {notif}
      </Alert>
    )

  return (
    <Alert variant="success" style={success}>
      {notif}
    </Alert>
  )
}

export default Notification
